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

const newUserStore = userStore()

const userLoggedIn = () => {
  return newUserStore.userSession.level !== -1
}

const login = async () => {
  if (serviceInfo.username == '' || serviceInfo.password == '') {
    message.error('用户名或密码不能为空')
    return
  }
  const res = await userService.login({
    username: serviceInfo.username,
    password: serviceInfo.password
  })
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

  const res = await userService.register({
    username: serviceInfo.username,
    password: serviceInfo.password,
    email: serviceInfo.email
  })
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
  <a-button v-show="!userLoggedIn()" type="primary" @click="dialogVisible = true" class="btn">登录/注册</a-button>
  <a-button v-show="userLoggedIn()" type="primary" @click="newUserStore.clearUserInfo" class="btn">退出登录</a-button>
  <a-modal
    v-model:open="dialogVisible"
    centered
    :footer="null"
    width="400px"
    :title="isLogin === 'login' ? '登录' : '注册'"
  >
    <a-form
      :model="serviceInfo"
      name="login"
      class="login-form"
      :label-col="{ span: 6 }"
      v-if="isLogin === 'login'"
    >
      <a-form-item
        label="用户名"
        name="username"
      >
        <a-input v-model:value="serviceInfo.username" placeholder="用户名">
        </a-input>
      </a-form-item>
      <a-form-item
        label="密码"
        name="password"
      >
        <a-input-password v-model:value="serviceInfo.password" placeholder="密码">
        </a-input-password>
      </a-form-item>
      <a-form-item>
        <a-button
          :disabled="!serviceInfo.username || !serviceInfo.password"
          type="primary"
          @click="login"
          class="login-form-button"
        >
          登录
        </a-button>
        Or
        <a @click="isLogin='register'">注册</a>
      </a-form-item>
    </a-form>
    <a-form
      :model="serviceInfo"
      name="register"
      class="login-form"
      :label-col="{ span: 6 }"
      v-else-if="isLogin === 'register'"
    >
      <a-form-item
        label="用户名"
        name="username"
        :rules="[{ required: true, message: '请输入用户名，长度为 3~20 位', min: 3, max: 20 }]"
      >
        <a-input v-model:value="serviceInfo.username" placeholder="用户名">
        </a-input>
      </a-form-item>
      <a-form-item
        label="邮箱"
        name="email"
        :rules="[{ required: true, message: '请输入邮箱', min: 3}]"
      >

        <a-input v-model:value="serviceInfo.email" placeholder="邮箱">
        </a-input>
      </a-form-item>
      <a-form-item
        label="密码"
        name="password"
        :rules="[{ required: true, message: '请输入密码，长度为 6~20 位', min: 6, max: 20 }]"
      >
        <a-input-password v-model:value="serviceInfo.password" placeholder="密码">
        </a-input-password>
      </a-form-item>
      <a-form-item
        label="确认密码"
        name="passwordConfirm"
        :rules="[{ required: true, message: '请确认密码，长度为 6~20 位', min: 6, max: 20 }]"
      >
        <a-input-password v-model:value="serviceInfo.passwordConfirm" placeholder="确认密码">
        </a-input-password>
      </a-form-item>
      <a-form-item>
        <a-button
          :disabled="!serviceInfo.username || !serviceInfo.password || !serviceInfo.email || !serviceInfo.passwordConfirm"
          type="primary"
          @click="register"
          class="login-form-button"
        >
          注册
        </a-button>
        Or
        <a @click="isLogin='login'">登录</a>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style scoped>
.login-form {
  max-width: 300px;
}

.register-form {
  max-width: 300px;
}

.login-form-button {
  width: 100%;
}

.btn {
  margin: auto 20px;
}
</style>
