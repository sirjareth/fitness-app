<template>
  <nav class="navbar">
    <router-link to="/" class="brand">💪 FitTrack</router-link>
    <div class="nav-actions">
      <template v-if="authStore.isAuthenticated">
        <router-link to="/dashboard" class="nav-link">My Workouts</router-link>
        <button class="logout-btn" @click="handleLogout">Logout</button>
      </template>
      <template v-else>
        <router-link to="/login" class="nav-link">Login</router-link>
        <router-link to="/register" class="nav-btn">Get Started</router-link>
      </template>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

function handleLogout() {
  authStore.logout()
  router.push('/')
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
  text-decoration: none;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.nav-link {
  color: #aaa;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #fff;
}

.nav-btn {
  padding: 8px 18px;
  background: #4ade80;
  color: #000;
  font-weight: 700;
  border-radius: 8px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: background 0.2s;
}

.nav-btn:hover {
  background: #22c55e;
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