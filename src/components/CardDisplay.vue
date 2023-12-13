<script setup lang="ts">
import { ref } from 'vue';
const openUrl = (url: string) => {
    window.open(url);
};
const data = ref([
        {
            "name": "派节保论",
            "rate": 5,
            "id": "58",
            "image": "http://dummyimage.com/400x400",
            "url": "https://example.com"
        },
        {
            "name": "参局往装四越",
            "rate": 7,
            "id": "92",
            "image": "http://dummyimage.com/400x400",
            "url": "https://example.com"
        },
        {
            "name": "省写文法基难",
            "rate": 3,
            "id": "33",
            "image": "http://dummyimage.com/400x400",
            "url": "https://example.com"
        },
        {
            "name": "极油将体级",
            "rate": 4,
            "id": "36",
            "image": "http://dummyimage.com/400x400",
            "url": "https://example.com"
        },
        {
            "name": "写派或并向",
            "rate": 7,
            "id": "14",
            "image": "http://dummyimage.com/400x400",
            "url": "https://example.com"
        },
        {
            "name": "油过持办无部常",
            "rate": 8,
            "id": "50",
            "image": "http://dummyimage.com/400x400",
            "url": "https://example.com"
        }
    ])
</script>

<template>
    <a-row>
        <a-col :span="6" v-for="item in data">
            <a-card hoverable class="card" @click="openUrl(item.url)">
                <template #cover>
                    <img :src="item.image" :alt="item.name" class="cover-image">
                </template>
                <a-card-meta :title="item.name">
                    <template #description>
                        <a-rate :value="item.rate/2" disabled allow-half />
                        <span class="rate-num">{{ item.rate }}</span>
                    </template>
                </a-card-meta>
            </a-card>
        </a-col>
    </a-row>
</template>

<style scoped>
.card {
    margin: 20px;
}

.cover-image {
    aspect-ratio: 2/3;
    object-fit: cover;
}

.rate-num {
    margin-left: 10px;
    font-size: 20px;
    color: #fae314;
}
</style>