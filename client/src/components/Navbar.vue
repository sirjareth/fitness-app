<template>
  <nav class="navbar">
    <span class="brand">💪 FitTrack</span>
    <button class="logout-btn" @click="handleLogout">Logout</button>
  </nav>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background: #1a1a1a;
  border-bottom: 1px solid #2e2e2e;
}

.brand {
  font-size: 1.3rem;
  font-weight: 700;
  color: #4ade80;
}

.logout-btn {
  background: transparent;
  border: 1px solid #4ade80;
  color: #4ade80;
  padding: 8px 18px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.logout-btn:hover {
  background: #4ade80;
  color: #000;
}
</style>