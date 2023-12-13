<script setup lang="ts">
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
dayjs.extend(relativeTime);
import CryptoJS from 'crypto-js';

import { ref } from 'vue';
import userStore from '../stores/userStore';
const commentText = ref('');
const newUserStore = userStore();

const email2avatar = (email: string) => {
    return `https://cravatar.cn/avatar/${CryptoJS.MD5(email.trim().toLowerCase()).toString()}`;
};

const handleSubmit = () => {
    console.log(data)
    if (commentText.value.trim() === '') {
        return;
    }
    data.value.unshift({
        author: newUserStore.userSession.username,
        avatar: email2avatar(newUserStore.userSession.email),
        content: commentText.value,
        datetime: Math.floor(Date.now() / 1000).toString(),
    });
    commentText.value = '';
    console.log(data)
};

const data = ref([
    {
        author: 'zhullyb',
        avatar: 'https://bu.dusays.com/2022/03/20/d9af04eba27b5.png',
        content:
            '如你所见，这是一条测试数据',
        datetime: '1702456165',
    },
    {
        author: 'zhullyb',
        avatar: 'https://bu.dusays.com/2022/03/20/d9af04eba27b5.png',
        content:
            '不用说你也知道，这是另一条测试数据',
        datetime: '1702456165',
    },
]);
</script>

<template>
    <div class="root">
        <a-comment>
            <template #avatar>
                <a-avatar :src="email2avatar(newUserStore.userSession.email)" alt="Han Solo" />
            </template>
            <template #content>
                <a-form-item>
                    <a-textarea v-model:value="commentText" :rows="4" />
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" @click="handleSubmit">
                        Add Comment
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
</style>