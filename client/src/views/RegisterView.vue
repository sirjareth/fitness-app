<template>
  <div class="auth-container">
    <div class="auth-card">
      <h1>💪 FitTrack</h1>
      <p class="subtitle">Create your account</p>

      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label>Email</label>
          <input v-model="email" type="email" placeholder="you@email.com" required />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input v-model="password" type="password" placeholder="••••••••" required />
        </div>

        <p v-if="error" class="error-msg">{{ error }}</p>
        <p v-if="success" class="success-msg">{{ success }}</p>

        <button type="submit" :disabled="loading">
          {{ loading ? 'Registering...' : 'Create Account' }}
        </button>
      </form>

      <p class="switch-link">
        Already have an account? <router-link to="/login">Login here</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const email = ref('')
const password = ref('')
const error = ref('')
const success = ref('')
const loading = ref(false)

const authStore = useAuthStore()
const router = useRouter()

async function handleRegister() {
  error.value = ''
  success.value = ''
  loading.value = true
  try {
    await authStore.register(email.value, password.value)
    success.value = 'Account created! Redirecting to login...'
    setTimeout(() => router.push('/login'), 1500)
  } catch (err) {
    error.value = err.response?.data?.message || 'Registration failed. Try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
  /* Same styles as LoginView */
  .auth-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0f0f0f;
  }
  .auth-card {
    background: #1a1a1a;
    border: 1px solid #2e2e2e;
    border-radius: 16px;
    padding: 40px;
    width: 100%;
    max-width: 420px;
  }
  h1 { font-size: 1.8rem; margin-bottom: 6px; color: #4ade80; }
  .subtitle { color: #888; margin-bottom: 28px; font-size: 0.95rem; }
  .form-group { margin-bottom: 18px; }
  label { display: block; font-size: 0.85rem; color: #aaa; margin-bottom: 6px; }
  input {
    width: 100%; padding: 12px 14px; background: #111;
    border: 1px solid #2e2e2e; border-radius: 8px;
    color: #fff; font-size: 0.95rem; outline: none; transition: border 0.2s;
  }
  input:focus { border-color: #4ade80; }
  button[type='submit'] {
    width: 100%; padding: 13px; background: #4ade80;
    color: #000; font-weight: 700; font-size: 1rem;
    border: none; border-radius: 8px; cursor: pointer;
    margin-top: 8px; transition: background 0.2s;
  }
  button:disabled { opacity: 0.6; cursor: not-allowed; }
  button[type='submit']:hover:not(:disabled) { background: #22c55e; }
  .error-msg { color: #f87171; font-size: 0.85rem; margin-bottom: 10px; }
  .success-msg { color: #4ade80; font-size: 0.85rem; margin-bottom: 10px; }
  .switch-link { text-align: center; margin-top: 20px; color: #888; font-size: 0.9rem; }
  .switch-link a { color: #4ade80; text-decoration: none; }
</style>