<template>
  <div class="home">
    <!-- Header -->
    <div class="page-header">
      <div>
        <h2>Browse Workouts</h2>
        <p class="subtext">{{ sampleWorkouts.length }} workouts available</p>
      </div>
    </div>

    <!-- Search + Filter -->
    <div class="filters">
      <div class="search-box">
        <span class="search-icon">🔍</span>
        <input v-model="search" placeholder="e.g. Push Ups, Swimming..." />
      </div>
      <div class="category-filters">
        <button v-for="cat in categories" :key="cat" :class="['cat-btn', { active: selectedCategory === cat }]"
          @click="selectedCategory = cat">
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- Workout Grid -->
    <div class="workout-grid">
      <div class="workout-card" v-for="workout in filteredWorkouts" :key="workout.name">
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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { sampleWorkouts } from '../data/sampleWorkouts.js'

const router = useRouter()
const search = ref('')
const selectedCategory = ref('All')

function goToLogin() {
  router.push('/login')
}

const categories = computed(() => {
  const cats = [...new Set(sampleWorkouts.map(w => w.category))]
  return ['All', ...cats]
})

const aliases = {
  'running': 'run',
  'jogging': 'jog',
  'swimming': 'swim',
  'pressing': 'press',
  'pulling': 'pull',
  'pushing': 'push',
}

const filteredWorkouts = computed(() => {
  const raw = search.value.toLowerCase()
  const term = aliases[raw] || raw

  return sampleWorkouts.filter(w => {
    const matchSearch = !term || w.name.toLowerCase().includes(term)
    const matchCat = selectedCategory.value === 'All' || w.category === selectedCategory.value
    return matchSearch && matchCat
  })
})
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 36px 32px;
}

.page-header {
  margin-bottom: 28px;
}

h2 {
  font-size: 2rem;
  font-weight: 800;
  color: #fff;
}

.subtext {
  color: #888;
  font-size: 0.9rem;
  margin-top: 4px;
}

/* Filters */
.filters {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 32px;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #1a1a1a;
  border: 1px solid #2e2e2e;
  border-radius: 10px;
  padding: 12px 16px;
  max-width: 400px;
}

.search-box input {
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: 0.95rem;
  width: 100%;
}

.search-icon {
  font-size: 1rem;
}

.category-filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.cat-btn {
  padding: 6px 16px;
  background: #1a1a1a;
  border: 1px solid #2e2e2e;
  border-radius: 20px;
  color: #aaa;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}

.cat-btn:hover {
  border-color: #4ade80;
  color: #4ade80;
}

.cat-btn.active {
  background: #4ade80;
  color: #000;
  border-color: #4ade80;
  font-weight: 700;
}

/* Grid */
.workout-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
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
  color: #fff;
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
</style>