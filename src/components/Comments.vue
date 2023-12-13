<script setup lang="ts">
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
dayjs.extend(relativeTime);
import CryptoJS from 'crypto-js';
import { commentListItem } from '../types/comment';
import { getCurrentInstance, onMounted, ref } from 'vue';
import commentService from '../apis/commentService';
import userStore from '../stores/userStore';
import { message } from 'ant-design-vue';
const commentText = ref('');
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
                    </a-comment>
                </a-list-item>
            </template>
        </a-list>
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