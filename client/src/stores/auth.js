import { defineStore } from 'pinia'
import api from '../api/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token
  },
  actions: {
    async register(email, password) {
      const res = await api.post('/users/register', { email, password })
      console.log('REGISTER RESPONSE:', res.data)  // add this
      return res.data
    },
    async login(email, password) {
      const res = await api.post('/users/login', { email, password })
      console.log('LOGIN RESPONSE:', res.data)  // add this
      this.token = res.data.access    // adjust if your API returns differently
      localStorage.setItem('token', this.token)
      return res.data
    },
    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
    }
  }
})