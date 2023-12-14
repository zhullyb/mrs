<script setup lang="ts">
import { RouterView } from 'vue-router';
import MyHeader from './components/MyHeader.vue';
</script>

<template>
<MyHeader/>
<RouterView :key="$route.fullPath" />
</template>