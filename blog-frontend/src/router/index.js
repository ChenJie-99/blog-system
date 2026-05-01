import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

import Login from '@/views/Login.vue'
import Layout from '@/layout/Layout.vue'
import ArticleList from '@/views/article/ArticleList.vue'
import ArticleForm from '@/views/article/ArticleForm.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: Layout,
      redirect: '/articles',
      children: [
        {
          path: 'articles',
          component: ArticleList
        },
        {
          path: 'articles/add',
          component: ArticleForm
        },
        {
          path: 'articles/edit/:id',
          component: ArticleForm
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if (to.path !== '/login' && !userStore.token) {
    next('/login')
  } else {
    next()
  }
})

export default router


