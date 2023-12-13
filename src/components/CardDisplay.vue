<script setup lang="ts">
import { onMounted, ref } from 'vue';
import movieService from '../apis/movieService';
import { movieListItem } from '../types/movie';
const openUrl = (mid: string) => {
    window.open(`/movie/${mid}`);
};
const data = ref<Array<movieListItem>>()

onMounted(async () => {
    const res = await movieService.getMovieList();
    data.value = res.data.data;
});
</script>

<template>
    <a-row>
        <a-col :span="6" v-for="item in data">
            <a-card hoverable class="card" @click="openUrl(item.mid)">
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