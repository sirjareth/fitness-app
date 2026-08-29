<template>
  <div class="card" :class="{ completed: workout.status === 'completed' }">
    <div class="card-image">
      <img :src="workoutImage" :alt="workout.name" />
      <span class="status-badge" :class="workout.status">
        {{ workout.status === 'completed' ? '✅ Done' : '🔥 Active' }}
      </span>
    </div>
    <div class="card-body">
      <h3>{{ workout.name }}</h3>
      <div class="card-info">
        <span>⏱ {{ workout.duration }} mins</span>
        <span v-if="workout.sets">📦 {{ workout.sets }} sets</span>
        <span v-if="workout.reps">🔁 {{ workout.reps }} reps</span>
      </div>
      <div class="card-actions">
        <button class="btn-complete" @click="$emit('complete', workout._id)" :disabled="workout.status === 'completed'">
          Mark Done
        </button>
        <button class="btn-edit" @click="$emit('edit', workout)">Edit</button>
        <button class="btn-delete" @click="$emit('delete', workout._id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getWorkoutImage } from '../data/workoutImages.js'

const workoutImage = computed(() => getWorkoutImage(props.workout.name))

const props = defineProps({ workout: Object })
defineEmits(['complete', 'edit', 'delete'])

const workoutImages = {
  'push up': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80',
  'pushup': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80',
  'bench press': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80',
  'curl': 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=80',
  'running': 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&q=80',
  'jogging': 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&q=80',
  'swimming': 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&q=80',
  'squat': 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&q=80',
  'deadlift': 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&q=80',
  'plank': 'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=400&q=80',
  'yoga': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80',
  'cycling': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
  'pullup': 'https://images.unsplash.com/photo-1598971639058-fab3c3109a69?w=400&q=80',
  'pull up': 'https://images.unsplash.com/photo-1598971639058-fab3c3109a69?w=400&q=80',
}

const defaultImage = 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80'


</script>

<style scoped>
.card {
  background: #1a1a1a;
  border: 1px solid #2e2e2e;
  border-radius: 14px;
  overflow: hidden;
  transition: border 0.2s;
}

.card:hover {
  border-color: #4ade80;
}

.card.completed {
  opacity: 0.6;
}

.card-image {
  position: relative;
  width: 100%;
  height: 160px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.card:hover .card-image img {
  transform: scale(1.05);
}

.status-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 0.75rem;
  padding: 4px 10px;
  border-radius: 20px;
  font-weight: 600;
  backdrop-filter: blur(4px);
}

.status-badge.completed {
  background: rgba(20, 83, 45, 0.85);
  color: #4ade80;
}

.status-badge.pending,
.status-badge:not(.completed) {
  background: rgba(67, 20, 7, 0.85);
  color: #fb923c;
}

.card-body {
  padding: 16px 20px;
}

h3 {
  font-size: 1.1rem;
  color: #fff;
  margin-bottom: 8px;
}

.card-info {
  display: flex;
  gap: 14px;
  color: #aaa;
  font-size: 0.88rem;
  margin-bottom: 14px;
}

.card-actions {
  display: flex;
  gap: 8px;
}

.btn-complete {
  padding: 7px 14px;
  background: #14532d;
  color: #4ade80;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background 0.2s;
}

.btn-complete:hover:not(:disabled) {
  background: #166534;
}

.btn-complete:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn-edit {
  padding: 7px 14px;
  background: #1e3a5f;
  color: #60a5fa;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background 0.2s;
}

.btn-edit:hover {
  background: #1d4ed8;
  color: #fff;
}

.btn-delete {
  padding: 7px 14px;
  background: #3f1515;
  color: #f87171;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background 0.2s;
}

.btn-delete:hover {
  background: #7f1d1d;
}
</style>