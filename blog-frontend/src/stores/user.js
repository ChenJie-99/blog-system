import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    userInfo: null
  }),

  actions: {
    login(data) {
      this.token = data.token
      this.userInfo = data.userInfo || null
    },

    logout() {
      this.token = ''
      this.userInfo = null
    }
  },

  persist: true
})