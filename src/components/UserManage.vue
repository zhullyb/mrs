<script setup lang="ts">
import { onMounted, ref } from 'vue';
import userService from '../apis/userService';
import { message } from 'ant-design-vue';
const userList = ref([]);

const columns = [
    {
        title: 'uid',
        dataIndex: 'uid',
        key: 'uid',
    },
    {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
    }
]

onMounted(async () => {
    const res = await userService.getUsers();
    if (res.data.code == 200) {
        userList.value = res.data.data;
    } else {
        message.warning(res.data.msg);
    }
})
</script>

<template>
<a-table :columns="columns" :dataSource="userList"></a-table>
</template>