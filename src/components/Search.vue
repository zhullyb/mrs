<script setup lang="ts">
import { getCurrentInstance, onMounted, ref } from 'vue';
import { movieListItem } from '../types/movie';
import movieService from '../apis/movieService';

const keyword = getCurrentInstance()?.proxy?.$route.query.keyword as string;
const result = ref<Array<movieListItem>>([]);

onMounted( async () => {
    const res = await movieService.SearchMovie(keyword);
    result.value = res.data.data;
});

</script>

<template>
    <div>
        <h2>搜到关于 {{ keyword }} 的 {{ result.length }} 条结果</h2>
        <a-list item-layout="vertical" :dataSource="result">
            <template #renderItem="{ item }">
                <div>
                    <a-list-item style="display: inline-flex;">
                        <a :href="`/movie/${item.mid}`">
                            <a-image
                                :src="item.image"
                                :width="100"
                                :preview=false
                            />
                        </a>
                        <div class="item-content">
                            <a :href="`/movie/${item.mid}`">
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