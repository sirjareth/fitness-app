<template>
  <div id="app">
    <Navbar v-if="authStore.isAuthenticated" />
    <router-view />
  </div>
</template>

<script setup>
  import Navbar from './components/Navbar.vue'
  import { useAuthStore } from './stores/auth'

  const authStore = useAuthStore()
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', sans-serif;
  background: #0f0f0f;
  color: #fff;
  min-height: 100vh;
}
</style>