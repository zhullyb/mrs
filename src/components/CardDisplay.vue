<script setup lang="ts">
import { onMounted, ref } from 'vue';
import movieService from '../apis/movieService';
import { movieListItem } from '../types/movie';
import { useRouter } from 'vue-router';
const router = useRouter();
const openUrl = (mid: string) => {
    router.push({
        path: `/movie/${mid}`,
    });
};
const data = ref<Array<movieListItem>>()

onMounted(async () => {
    const res = await movieService.getMovieList();
    data.value = res.data.data;
});
</script>

<template>
    <a-row class="root">
        <a-col :span="6" v-for="item in data">
            <a-card hoverable class="card" @click="openUrl(item.mid)">
                <template #cover>
                    <img :src="item.image" :alt="item.name" class="cover-image">
                </template>
                <a-card-meta :title="item.name">
                    <template #description>
                        <a-rate :value="item.rate/2" disabled allow-half class="rate-class" />
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