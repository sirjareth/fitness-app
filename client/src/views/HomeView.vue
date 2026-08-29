<template>
  <div class="home">

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Track Your <span class="highlight">Fitness Journey</span></h1>
        <p>Log workouts, monitor progress, and crush your goals — all in one place.</p>
        <div class="hero-actions">
          <router-link to="/register" class="btn-primary">Get Started Free</router-link>
          <router-link to="/login" class="btn-secondary">Login</router-link>
        </div>
      </div>
      <div class="hero-image">
        <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80" alt="Fitness" />
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <h2>Everything you need to stay fit</h2>
      <div class="features-grid">
        <div class="feature-card">
          <span class="feature-icon">📋</span>
          <h3>Log Workouts</h3>
          <p>Track every exercise, duration, sets and reps easily.</p>
        </div>
        <div class="feature-card">
          <span class="feature-icon">✅</span>
          <h3>Track Progress</h3>
          <p>Mark workouts as done and monitor your consistency.</p>
        </div>
        <div class="feature-card">
          <span class="feature-icon">✏️</span>
          <h3>Edit Anytime</h3>
          <p>Update or delete workouts as your routine changes.</p>
        </div>
        <div class="feature-card">
          <span class="feature-icon">🔒</span>
          <h3>Secure & Personal</h3>
          <p>Your workouts are private — only you can see them.</p>
        </div>
      </div>
    </section>

    <!-- Sample Workouts Section -->
    <section class="sample-workouts">
      <h2>Sample Workouts</h2>
      <p class="section-sub">Here's what you can track with FitTrack</p>
      <div class="workout-grid">
        <div class="workout-card" v-for="workout in sampleWorkouts" :key="workout.name">
          <div class="workout-img">
            <img :src="workout.image" :alt="workout.name" />
            <span class="workout-tag">{{ workout.category }}</span>
          </div>
          <div class="workout-info">
            <h3>{{ workout.name }}</h3>
            <p>⏱ {{ workout.duration }} mins</p>
            <button class="btn-try" @click="goToLogin">+ Add to My Workouts</button>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <h2>Ready to start your fitness journey?</h2>
      <p>Join FitTrack today and take control of your workouts.</p>
      <router-link to="/register" class="btn-primary">Create Free Account</router-link>
    </section>

  </div>
</template>

<script setup>
import { sampleWorkouts } from '../data/sampleWorkouts.js'
import { useRouter } from 'vue-router'

const router = useRouter()

function goToLogin() {
  router.push('/login')
}

</script>

<style scoped>
.home {
  padding-bottom: 80px;
}

/* Hero */
.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  padding: 80px 80px;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-content {
  flex: 1;
}

.hero-content h1 {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 20px;
}

.highlight {
  color: #4ade80;
}

.hero-content p {
  font-size: 1.1rem;
  color: #aaa;
  margin-bottom: 32px;
  max-width: 480px;
}

.hero-actions {
  display: flex;
  gap: 14px;
}

.hero-image {
  flex: 1;
  border-radius: 20px;
  overflow: hidden;
  max-width: 500px;
}

.hero-image img {
  width: 100%;
  height: 380px;
  object-fit: cover;
}

/* Buttons */
.btn-primary {
  padding: 13px 28px;
  background: #4ade80;
  color: #000;
  font-weight: 700;
  border-radius: 10px;
  text-decoration: none;
  font-size: 1rem;
  transition: background 0.2s;
  display: inline-block;
}

.btn-primary:hover {
  background: #22c55e;
}

.btn-secondary {
  padding: 13px 28px;
  background: transparent;
  color: #fff;
  font-weight: 600;
  border-radius: 10px;
  text-decoration: none;
  font-size: 1rem;
  border: 1px solid #444;
  transition: all 0.2s;
  display: inline-block;
}

.btn-secondary:hover {
  border-color: #4ade80;
  color: #4ade80;
}

/* Features */
.features {
  padding: 80px;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.features h2 {
  font-size: 2rem;
  margin-bottom: 48px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

.feature-card {
  background: #1a1a1a;
  border: 1px solid #2e2e2e;
  border-radius: 14px;
  padding: 28px 24px;
  transition: border 0.2s;
}

.feature-card:hover {
  border-color: #4ade80;
}

.feature-icon {
  font-size: 2rem;
  display: block;
  margin-bottom: 14px;
}

.feature-card h3 {
  font-size: 1.1rem;
  margin-bottom: 8px;
}

.feature-card p {
  color: #888;
  font-size: 0.9rem;
}

/* Sample Workouts */
.sample-workouts {
  padding: 80px;
  max-width: 1200px;
  margin: 0 auto;
}

.sample-workouts h2 {
  font-size: 2rem;
  margin-bottom: 8px;
}

.section-sub {
  color: #888;
  margin-bottom: 40px;
}

.workout-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.workout-card {
  background: #1a1a1a;
  border: 1px solid #2e2e2e;
  border-radius: 14px;
  overflow: hidden;
  transition: border 0.2s, transform 0.2s;
}

.workout-card:hover {
  border-color: #4ade80;
  transform: translateY(-4px);
}

.workout-img {
  position: relative;
  height: 180px;
  overflow: hidden;
}

.workout-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.workout-card:hover .workout-img img {
  transform: scale(1.05);
}

.workout-tag {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: #4ade80;
  font-size: 0.75rem;
  padding: 4px 10px;
  border-radius: 20px;
  font-weight: 600;
}

.workout-info {
  padding: 16px 20px;
}

.workout-info h3 {
  font-size: 1.05rem;
  margin-bottom: 6px;
}

.workout-info p {
  color: #888;
  font-size: 0.88rem;
  margin-bottom: 14px;
}

.btn-try {
  width: 100%;
  padding: 9px;
  background: transparent;
  border: 1px solid #4ade80;
  color: #4ade80;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.88rem;
  transition: all 0.2s;
}

.btn-try:hover {
  background: #4ade80;
  color: #000;
  font-weight: 700;
}

/* CTA */
.cta {
  text-align: center;
  padding: 80px;
  background: #111;
  margin-top: 40px;
}

.cta h2 {
  font-size: 2rem;
  margin-bottom: 12px;
}

.cta p {
  color: #888;
  margin-bottom: 32px;
}
</style>