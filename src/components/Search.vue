<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { movieListItem } from '../types/movie';
import movieService from '../apis/movieService';

// TODO: get keyword from router
const keyword = '名侦探柯南'
const result = ref<Array<movieListItem>>([]);

onMounted( async () => {
    const res = await movieService.SearchMovie(keyword);
    result.value = res.data.data;
});

</script>

<template>
    <div>
        <h1>标题</h1>
        <a-list item-layout="vertical" :dataSource="result">
            <template #renderItem="{ item }">
                <div>
                    <a-list-item style="display: inline-flex;">
                        <a :href="item.url">
                            <a-image
                                :src="item.image"
                                :width="100"
                                :preview=false
                            />
                        </a>
                        <div class="item-content">
                            <a :href="item.url">
                                <h3>{{ item.name }}</h3>
                            </a>
                            <a-rate :value="item.rate/2" disabled allow-half />
                            <span class="rate-num">{{ item.rate }}</span>
                            <p>{{ item.description }}</p>
                        </div>
                    </a-list-item>
                </div>
            </template>
        </a-list>
    </div>
</template>

<style scoped>
.item-content {
    margin-left: 10px;
}

.rate-num {
    margin-left: 10px;
    font-size: 16px;
    color: #fae314; 
}
</style>