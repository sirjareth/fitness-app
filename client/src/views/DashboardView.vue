<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <div>
        <h2>My Workouts</h2>
        <p class="subtext">{{ workouts.length }} workout(s) logged</p>
      </div>
      <button class="add-btn" @click="showForm = !showForm">
        {{ showForm ? '✕ Cancel' : '+ Add Workout' }}
      </button>
    </div>

    <WorkoutForm
      v-if="showForm"
      :workout="editingWorkout"
      @cancel="closeForm"
      @saved="onSaved"
    />

    <div v-if="loading" class="loading">Loading workouts...</div>

    <div v-else-if="workouts.length === 0" class="empty-state">
      <p>No workouts yet. Add your first one! 💪</p>
    </div>

    <div v-else class="workout-grid">
      <WorkoutCard
        v-for="workout in workouts"
        :key="workout._id"
        :workout="workout"
        @complete="handleComplete"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useWorkoutStore } from '../stores/workouts'
import WorkoutCard from '../components/WorkoutCard.vue'
import WorkoutForm from '../components/WorkoutForm.vue'

const workoutStore = useWorkoutStore()
const workouts = computed(() => workoutStore.workouts)
const loading = ref(false)
const showForm = ref(false)
const editingWorkout = ref(null)

onMounted(async () => {
  loading.value = true
  await workoutStore.fetchWorkouts()
  loading.value = false
})

function handleEdit(workout) {
  editingWorkout.value = workout
  showForm.value = true
}

function closeForm() {
  showForm.value = false
  editingWorkout.value = null
}

function onSaved() {
  closeForm()
}

async function handleComplete(id) {
  await workoutStore.completeWorkout(id)
}

async function handleDelete(id) {
  if (confirm('Delete this workout?')) {
    await workoutStore.deleteWorkout(id)
  }
}
</script>

<style scoped>
.dashboard {
  max-width: 900px;
  margin: 0 auto;
  padding: 36px 24px;
}
.dashboard-header {
  display: flex; justify-content: space-between;
  align-items: center; margin-bottom: 28px;
}
h2 { font-size: 1.6rem; color: #fff; }
.subtext { color: #888; font-size: 0.9rem; margin-top: 4px; }
.add-btn {
  padding: 11px 22px; background: #4ade80; color: #000;
  font-weight: 700; border: none; border-radius: 10px;
  cursor: pointer; transition: background 0.2s;
}
.add-btn:hover { background: #22c55e; }
.workout-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}
.loading, .empty-state {
  text-align: center; color: #888;
  padding: 60px 0; font-size: 1rem;
}
</style>