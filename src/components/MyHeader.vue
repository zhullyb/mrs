<script setup lang="ts">
import Login from '../components/Login.vue';
import SearchBar from '../components/SearchBar.vue'
import router from '../routers';
import userStore from '../stores/userStore';
const newUserStore = userStore();
const toUserManage = () => {
    router.push('/usermanage');
}
</script>

<template>
    <div class="header-root">
        <div class="main-header">
            <a href="/" style="text-decoration: none;">
                <h1 class="title">竹林影评</h1>
            </a>
            <div style="display: flex;">
                <SearchBar style="margin: auto;"/>
                <a-button v-show="newUserStore.userSession.level == 1" type="primary" style="margin: auto 0 auto 20px;" @click="toUserManage">用户管理</a-button>
                <Login style="margin: auto;"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
.header-root {
    width: 100%;
    border: 1px solid #e8e8e8;
    margin-bottom: 1rem;
}

.main-header {
    display: flex;
    justify-content: space-between;
    max-width: 55rem;
    margin: 0 auto;
}

.title {
    font-size: 2rem;
    font-weight: 700;
    color: rgb(82, 81, 81);
    text-align: center;
    margin: 10px;
    padding: 0;
}
</style>
