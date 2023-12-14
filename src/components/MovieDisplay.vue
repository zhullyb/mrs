<script setup lang="ts">
import { getCurrentInstance, onMounted, ref } from 'vue';
import { movieInfo } from '../types/movie';
import movieService from '../apis/movieService';
const mid = getCurrentInstance()?.proxy?.$route.params.id as string;
const data = ref<movieInfo>()

onMounted(async () => {
    console.log(mid)
    const res = await movieService.getInfo(mid)
    data.value = res.data.data
})

</script>

<template>
    <div class="root">
        <a-row>
            <a-col :offset="1">
                <h1>{{ data?.name }}</h1>
            </a-col>
            <a-divider />
            <a-col :span="8" :offset="1" class="cover-image-container">
                <img :src="data?.image" class="cover-image"/>
            </a-col>
            <a-col :span="14" :offset="1" style="color: #70757A;">
                <p v-show="data?.director"><span class="role">导演: </span>{{ data?.director }}</p>
                <p v-show="data?.screenwriter"><span class="role">编剧: </span>{{ data?.screenwriter }}</p>
                <p v-show="data?.mainActor"><span class="role">主演: </span>{{ data?.mainActor?.join(' / ') }}</p>
                <p v-show="data?.type"><span class="role">类型: </span>{{ data?.type?.join(' / ') }}</p>
                <p v-show="data?.website"><span class="role">官方网站: </span><a :href="data?.website">{{ data?.website }}</a></p>
                <p v-show="data?.country"><span class="role">制片国家/地区: </span>{{ data?.country }}</p>
                <p v-show="data?.language"><span class="role">语言: </span>{{ data?.language }}</p>
                <p v-show="data?.releaseDate"><span class="role">上映日期: </span>{{ data?.releaseDate }}</p>
                <p v-show="data?.length"><span class="role">片长: </span>{{ data?.length }}</p>
            </a-col>
            <a-divider />
            <a-col :span="22" :offset="1">
                <h2>剧情简介</h2>
                <p v-show="data?.description" class="description">{{ data?.description }}</p>
            </a-col>
            <a-divider />
        </a-row>
    </div>
</template>

<style scoped>
.root {
    max-width: 45rem;
    margin: 3rem auto;
}
.cover-image-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
.cover-image {
    width: 100%;
    aspect-ratio: 2 / 3;
    object-fit: cover;
}
.role {
    color: black;
}
.description {
    white-space: pre-line;
    color: #70757A;
}
</style>