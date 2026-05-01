<template>
  <el-container class="layout">
    <el-aside width="220px" class="aside">
      <div class="logo">个人博客后台</div>

      <el-menu
        router
        default-active="/articles"
        background-color="#304156"
        text-color="#fff"
        active-text-color="#409eff"
      >
        <el-menu-item index="/articles">
          文章管理
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="header">
        <span>博客后台管理系统</span>

        <el-button type="danger" size="small" @click="logout">
          退出登录
        </el-button>
      </el-header>

      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const logout = () => {
  userStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.layout {
  height: 100vh;
}

.aside {
  background: #304156;
}

.logo {
  height: 60px;
  color: white;
  line-height: 60px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.main {
  background: #f5f7fa;
}
</style>