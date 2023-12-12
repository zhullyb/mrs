<script setup lang="ts">
import { ref } from 'vue';
const searchContent = ref<String>('')
const search = () => {
    console.log(searchContent.value)
}

</script>

<template>
    <div>
        <a-input-search
            v-model:value="searchContent"
            placeholder="搜索电影"
            enter-button
            @search="search"
        />
    </div>
</template>