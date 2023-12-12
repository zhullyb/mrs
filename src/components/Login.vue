<script setup lang="ts">
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue';
import userService from '../apis/userService';
import userStore from '../stores/userStore';
const dialogVisible = ref(false)
const isLogin = ref('login')

const serviceInfo = reactive({
  username: '',
  password: '',
  passwordConfirm: '',
  email: ''
})

const confirmLoading = ref(false);
const newUserStore = userStore()

const userLoggedIn = () => {
  return newUserStore.userSession.level !== -1
}

const submitHandler = async () => {
  if (isLogin.value === 'login') {
    login()
  } else {
    register()
  }
  confirmLoading.value = false;
}

const login = async () => {
  if (serviceInfo.username == '' || serviceInfo.password == '') {
    message.error('用户名或密码不能为空')
    return
  }
  const res = await userService.login(serviceInfo)
  if (res.data.code === 200) {
    message.success('登录成功')
    dialogVisible.value = false
    newUserStore.setUserInfo({
      uid: res.data.data.uid,
      username: serviceInfo.username,
      email: res.data.data.email,
      level: res.data.data.level
    })
  } else {
    message.error(res.data.msg)
  }
}

const register = async () => {
  if (serviceInfo.username === '' || serviceInfo.password === '' || serviceInfo.email === '' || serviceInfo.passwordConfirm === '') {
    message.error('请填写完整信息')
    return
  } else if (serviceInfo.password !== serviceInfo.passwordConfirm) {
    message.error('两次密码不一致')
    return
  }

  const res = await userService.register(serviceInfo)
  if (res.data.code === 200) {
    newUserStore.setUserInfo({
      uid: res.data.data.uid,
      username: serviceInfo.username,
      email: res.data.data.email,
      level: res.data.data.level
    })
    dialogVisible.value = false
  } else {
    message.error(res.data.msg)
  }
}

</script>

<template>
  <a-button v-show="userLoggedIn" type="primary" @click="dialogVisible = true">登录/注册</a-button>
  <a-button v-show="!userLoggedIn" type="primary" @click="newUserStore.clearUserInfo">退出登录</a-button>
  <a-modal
    v-model:open="dialogVisible"
    width="30%"
    @ok="submitHandler"
    :confirm-loading="confirmLoading"
    cancel-text="取消"
    ok-text="确认"
  >
    <div>
      <a-radio-group v-model:value="isLogin" button-style="solid">
        <a-radio-button value='login'>登录</a-radio-button>
        <a-radio-button value='register'>注册</a-radio-button>
      </a-radio-group>
    </div>
    <div style="height: 20px;"></div>
    <div v-if="isLogin === 'login'">
      <a-space direction="vertical">
        <a-input v-model:value="serviceInfo.username" placeholder="用户名"></a-input>
        <a-input-password v-model:value="serviceInfo.password" placeholder="密码"></a-input-password>
      </a-space>
    </div>
    <div v-else-if="isLogin === 'register'">
      <a-space direction="vertical">
        <a-input v-model:value="serviceInfo.username" placeholder="用户名"></a-input>
        <a-input v-model:value="serviceInfo.email" placeholder="邮箱"></a-input>
        <a-input-password v-model:value="serviceInfo.password" placeholder="密码"></a-input-password>
        <a-input-password v-model:value="serviceInfo.passwordConfirm" placeholder="确认密码"></a-input-password>
      </a-space>
    </div>
  </a-modal>
</template>

<style scoped>
.a-modal {
  text-align: center;
}
</style>
