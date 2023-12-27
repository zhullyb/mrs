<script setup lang="ts">
import { onMounted, ref } from 'vue';
import movieService from '../apis/movieService';
import { movieListItem } from '../types/movie';
import { useRouter } from 'vue-router';
import userStore from '../stores/userStore';
const router = useRouter();
const newUserStore = userStore();
const openUrl = (mid: string) => {
    router.push({
        path: `/movie/${mid}`,
    });
};

const addMovie = () => {
    router.push({
        path: '/addMovie',
    });
};
const data = ref<Array<movieListItem>>()

function isMobileDevice () {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

onMounted(async () => {
    const res = await movieService.getMovieList();
    data.value = res.data.data;
});
</script>

<template>
    <a-row class="root">
        <a-col :span="isMobileDevice() ? 12 : 6"  v-show="newUserStore.userSession.level == 1">
            <a-card class="card" hoverable @click="addMovie">
                <template #cover>
                    <img src="/addMovie.jpg" alt="添加电影" class="cover-image">
                </template>
                <a-card-meta title="添加电影">
                    <template #description>
                        <a-rate value="5" disabled class="rate-class" />
                        <span class="rate-num"></span>
                    </template>
                </a-card-meta>
            </a-card>
        </a-col>
        <a-col :span="isMobileDevice() ? 12 : 6" v-for="item in data">
            <a-card hoverable class="card" @click="openUrl(item.mid)">
                <template #cover>
                    <img :src="item.image" :alt="item.name" class="cover-image">
                </template>
                <a-card-meta :title="item.name">
                    <template #description>
                        <a-rate v-show="!isMobileDevice()" :value="item.rate/2" disabled allow-half class="rate-class" />
                        <span class="rate-num">{{ item.rate }}</span>
                    </template>
                </a-card-meta>
            </a-card>
        </a-col>
    </a-row>
</template>

<style scoped>
.card {
    margin: 10px;
}

.cover-image {
    aspect-ratio: 2/3;
    object-fit: cover;
}

.rate-class {
    font-size: 0.9rem;
}

.rate-num {
    margin-left: 10px;
    font-size: 18px;
    color: #fae314;
}

.root {
    margin: 0 auto;
    max-width: 55rem;
}
</style>