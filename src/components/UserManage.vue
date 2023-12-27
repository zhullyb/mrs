<script setup lang="ts">
import { onMounted, ref } from 'vue';
import userService from '../apis/userService';
import { message } from 'ant-design-vue';
import modal from 'ant-design-vue/es/modal';
import userStore from '../stores/userStore';
const newUserStore = userStore();
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
    },
    {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
    }
]

const showDeleteConfirm = async (record: any) => {
    modal.confirm({
        title: '确定要删除' + record.username + '吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: async () => {
            const res = await userService.deleteUser(record.uid);
            if (res.data.code == 200) {
                message.success('删除成功');
                userList.value = userList.value.filter((item: any) => item.uid != record.uid);
            } else if (res.data.code == 401) {
                message.warning('登陆过期或未登陆，请重新登陆');
                newUserStore.clearUserInfo();
            } else {
                message.error(res.data.msg || '删除失败');
            }
        }
    })
}

onMounted(async () => {
    const res = await userService.getUsers();
    if (res.data.code == 200) {
        userList.value = res.data.data;
    } else if (res.data.code == 401) {
        message.warning('登陆过期或未登陆，请重新登陆');
        newUserStore.clearUserInfo();
    } else {
        message.warning(res.data.msg);
    }
})
</script>

<template>
<a-table :columns="columns" :dataSource="userList">
    <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
            <a-button
                type="primary"
                :disabled="record.level == 1"
                danger
                @click="showDeleteConfirm(record)"
            >
                删除
            </a-button>
        </template>
    </template>
</a-table>
</template>