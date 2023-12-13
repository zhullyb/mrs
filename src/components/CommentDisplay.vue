<script setup lang="ts">
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
dayjs.extend(relativeTime);

const data = [
    {
        author: 'zhullyb',
        avatar: 'https://bu.dusays.com/2022/03/20/d9af04eba27b5.png',
        content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        datetime: '1702456165',
    },
    {
        author: 'zhullyb',
        avatar: 'https://bu.dusays.com/2022/03/20/d9af04eba27b5.png',
        content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        datetime: '1702456165',
    },
];
</script>

<template>
    <a-list class="comment-list" :header="`${data.length} 个回复`" item-layout="horizontal" :data-source="data">
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
</template>

<style scoped>
.comment-list {
    max-width: 45rem;
    margin: 0 auto;
}
</style>