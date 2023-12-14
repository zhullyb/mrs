<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const searchContent = ref<string>('')
const router = useRouter()
const onSearch = () => {
    router.push({
        path: '/search',
        query: {
            searchContent: searchContent.value
        }
    })
}

</script>

<template>
    <div>
        <a-input-search
            v-model:value="searchContent"
            placeholder="搜索电影"
            enter-button
            @search="onSearch"
        />
    </div>
</template>