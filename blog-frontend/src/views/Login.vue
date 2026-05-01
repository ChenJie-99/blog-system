<template>
  <div class="login-page">
    <el-card class="login-card">
      <h2>博客后台登录</h2>

      <el-form :model="form" label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="form.username" placeholder="请输入账号" />
        </el-form-item>

        <el-form-item label="密码">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>

        <el-button type="primary" class="login-btn" @click="handleLogin">
          登录
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { loginApi } from '@/api/user'

const router = useRouter()
const userStore = useUserStore()

const form = reactive({
  username: 'admin',
  password: '123456'
})

const handleLogin = async () => {
  const res = await loginApi(form)

  if (res.code === 200) {
    userStore.login(res.data)
    ElMessage.success('登录成功')
    router.push('/articles')
  } else {
    ElMessage.error(res.message || '登录失败')
  }
}
</script>

<style scoped>
.login-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f7fa;
}

.login-card {
  width: 420px;
}

.login-card h2 {
  text-align: center;
  margin-bottom: 30px;
}

.login-btn {
  width: 100%;
}
</style>