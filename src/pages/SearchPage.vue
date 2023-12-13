<script setup lang="ts">
import MyHeader from '../components/MyHeader.vue';
import Search from '../components/Search.vue';
</script>

<template>
    <MyHeader />
    <div class="root">
        <Search />
    </div>
</template>

<style scoped>
.root {
    max-width: 55rem;
    margin: 0 auto;
}
</style>