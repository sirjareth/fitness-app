<template>
  <div class="form-wrapper">
    <h3>{{ isEditing ? 'Edit Workout' : 'Add Workout' }}</h3>
    <form @submit.prevent="handleSubmit">
      <div class="form-row">
        <div class="form-group">
          <label>Workout Name</label>
          <input v-model="form.name" placeholder="e.g. Bench Press" required />
        </div>
        <div class="form-group">
          <label>Duration (mins)</label>
          <input v-model="form.duration" type="number" placeholder="30" required />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Sets</label>
          <input v-model="form.sets" type="number" placeholder="3" />
        </div>
        <div class="form-group">
          <label>Reps</label>
          <input v-model="form.reps" type="number" placeholder="10" />
        </div>
      </div>
      <p v-if="error" class="error-msg">{{ error }}</p>
      <div class="form-actions">
        <button type="button" class="cancel-btn" @click="$emit('cancel')">Cancel</button>
        <button type="submit" :disabled="loading">
          {{ loading ? 'Saving...' : isEditing ? 'Update' : 'Add Workout' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useWorkoutStore } from '../stores/workouts'

const props = defineProps({
  workout: { type: Object, default: null }
})
const emit = defineEmits(['cancel', 'saved'])

const workoutStore = useWorkoutStore()
const loading = ref(false)
const error = ref('')
const isEditing = ref(false)

const form = ref({ name: '', duration: '', sets: '', reps: '' })

watch(() => props.workout, (val) => {
  if (val) {
    isEditing.value = true
    form.value = { ...val }
  }
}, { immediate: true })

async function handleSubmit() {
  error.value = ''
  loading.value = true
  try {
    if (isEditing.value) {
      await workoutStore.updateWorkout(props.workout._id, form.value)
    } else {
      await workoutStore.addWorkout(form.value)
    }
    emit('saved')
    form.value = { name: '', duration: '', sets: '', reps: '' }
  } catch (err) {
    error.value = err.response?.data?.message || 'Something went wrong.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.form-wrapper {
  background: #1a1a1a;
  border: 1px solid #2e2e2e;
  border-radius: 14px;
  padding: 28px;
  margin-bottom: 28px;
}
h3 { color: #4ade80; margin-bottom: 20px; font-size: 1.1rem; }
.form-row { display: flex; gap: 14px; }
.form-group { flex: 1; margin-bottom: 16px; }
label { display: block; font-size: 0.85rem; color: #aaa; margin-bottom: 6px; }
input {
  width: 100%; padding: 11px 13px; background: #111;
  border: 1px solid #2e2e2e; border-radius: 8px;
  color: #fff; font-size: 0.9rem; outline: none; transition: border 0.2s;
}
input:focus { border-color: #4ade80; }
.form-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 8px; }
button[type='submit'] {
  padding: 10px 24px; background: #4ade80; color: #000;
  font-weight: 700; border: none; border-radius: 8px; cursor: pointer; transition: background 0.2s;
}
button[type='submit']:hover:not(:disabled) { background: #22c55e; }
button:disabled { opacity: 0.6; cursor: not-allowed; }
.cancel-btn {
  padding: 10px 20px; background: transparent;
  border: 1px solid #444; color: #aaa; border-radius: 8px; cursor: pointer; transition: all 0.2s;
}
.cancel-btn:hover { border-color: #888; color: #fff; }
.error-msg { color: #f87171; font-size: 0.85rem; margin-bottom: 10px; }
</style>