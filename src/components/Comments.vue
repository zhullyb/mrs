<script setup lang="ts">
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
dayjs.extend(relativeTime);
import CryptoJS from 'crypto-js';
import { commentListItem, editCommentItem } from '../types/comment';
import { getCurrentInstance, onMounted, ref } from 'vue';
import commentService from '../apis/commentService';
import userStore from '../stores/userStore';
import { Modal, message } from 'ant-design-vue';
const commentText = ref('');
const editCommentData = ref<editCommentItem>({
    cid: '',
    content: '',
    rate: 0,
});
const editVisible = ref(false);
const rate = ref(0);
const mid = getCurrentInstance()?.proxy?.$route.params.mid as string;
const newUserStore = userStore();

const email2avatar = (email: string) => {
    return `https://cravatar.cn/avatar/${CryptoJS.MD5(email.trim().toLowerCase()).toString()}`;
};

const handleSubmit = async () => {
    if (commentText.value.trim() === '') {
        message.warning('评论不能为空');
        return;
    }
    if (rate.value === 0) {
        message.warning('请给电影评分');
        return;
    }
    const res = await commentService.addComment({
        mid: mid,
        content: commentText.value,
        uid: newUserStore.userSession.uid,
        rate: rate.value * 2,
    });
    if (res.data.code == 200) {
        commentText.value = '';
        rate.value = 0;
        getCommentList();
    } else {
        message.error(res.data.msg || '评论失败');
    }
};

const data = ref<Array<commentListItem>>([]);
const getCommentList = async () => {
    const res = await commentService.getCommentList(mid);
    data.value = res.data.data;
};

const editComment = (item: commentListItem) => {
    editCommentData.value = {
        cid: item.cid,
        content: item.content,
        rate: item.rate / 2,
    };
    editVisible.value = true;
};

const handleEdit = async () => {
    if (editCommentData.value.content.trim() === '') {
        message.warning('评论不能为空');
        return;
    }
    if (editCommentData.value.rate === 0) {
        message.warning('请给电影评分');
        return;
    }
    const res = await commentService.editComment({
        cid: editCommentData.value.cid,
        content: editCommentData.value.content,
        rate: editCommentData.value.rate * 2,
    });
    if (res.data.code == 200) {
        editVisible.value = false;
        message.success('编辑成功');
        getCommentList();
    } else {
        message.error(res.data.msg || '编辑失败');
    }
};

const deleteComment = (item: commentListItem) => {
    Modal.confirm({
        title: '删除评论',
        content: '确认删除该评论吗？',
        okText: '确认',
        cancelText: '取消',
        centered: true,
        onOk: async () => {
            const res = await commentService.deleteComment(item.cid);
            if (res.data.code == 200) {
                message.success('删除成功');
                getCommentList();
            } else {
                message.error(res.data.msg || '删除失败');
            }
        },
    });
}

onMounted(async () => {
    getCommentList();
});
</script>

<template>
    <div class="root">
        <a-comment>
            <template #avatar>
                <a-avatar :src="email2avatar(newUserStore.userSession.email)" :alt="newUserStore.userSession.username" />
            </template>
            <template #content>
                <a-form-item>
                    <a-textarea v-model:value="commentText" :rows="3" placeholder="速速交出你的评论！" />
                </a-form-item>
                <a-form-item style="display: flex;">
                    <a-rate v-model:value="rate" />
                    <a-button type="primary" @click="handleSubmit" style="float: right;">
                        发布
                    </a-button>
                </a-form-item>
            </template>
        </a-comment>
        <a-list :header="`${data.length} 个回复`" item-layout="horizontal" :data-source="data">
            <template #renderItem="{ item }">
                <a-list-item>
                    <a-comment :author="item.author" :avatar="item.avatar">
                        <template #content>
                            <p>
                                {{ item.content }}
                            </p>
                        </template>
                        <template #datetime>
                            <a-rate :value="item.rate/2" disabled allow-half class="rate-class"/>
                            <a-tooltip :title="dayjs.unix(item.datetime).format('YYYY-MM-DD HH:mm:ss')">
                                <span>{{ dayjs.unix(item.datetime).locale('zh-cn').fromNow() }}</span>
                            </a-tooltip>
                        </template>
                        <template #actions>
                            <span v-show="newUserStore.userSession.uid === item.uid || newUserStore.userSession.level >= 1">
                                <a @click="editComment(item)">编辑</a>
                                <a-divider type="vertical" />
                                <a @click="deleteComment(item)">删除</a>
                            </span>
                        </template>
                    </a-comment>
                </a-list-item>
            </template>
        </a-list>
        <a-modal
            v-model:open="editVisible"
            title="编辑评论"
            @ok="handleEdit"
            width="50rem"
            centered
        >
            <a-form-item>
                <a-textarea v-model:value="editCommentData.content" />
            </a-form-item>
            <a-form-item>
                <a-rate v-model:value="editCommentData.rate" />
            </a-form-item>
        </a-modal>
    </div>
</template>

<style scoped>
.root {
    max-width: 45rem;
    margin: 0 auto;
}

.rate-class {
    margin-right: 10px;
    font-size: 0.9rem;
}
</style>