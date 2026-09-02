<template>
  <div class="form-overlay" @click.self="$emit('cancel')">
    <div class="form-modal">

      <!-- STEP 1: Workout Picker -->
      <div v-if="step === 1">
        <div class="modal-header">
          <h3>Choose a Workout</h3>
          <button class="close-btn" @click="$emit('cancel')">✕</button>
        </div>

        <input v-model="search" class="search-input" placeholder="🔍 Search workout..." />

        <div class="category-filters">
          <button v-for="cat in categories" :key="cat" :class="['cat-btn', { active: selectedCategory === cat }]"
            @click="selectedCategory = cat">
            {{ cat }}
          </button>
        </div>

        <div class="picker-grid">
          <div v-for="workout in filteredWorkouts" :key="workout.name" class="picker-card"
            @click="selectWorkout(workout)">
            <img :src="workout.image" :alt="workout.name" />
            <div class="picker-card-info">
              <h4>{{ workout.name }}</h4>
              <span class="cat-tag">{{ workout.category }}</span>
            </div>
          </div>
        </div>

        <button class="custom-btn" @click="selectCustom">
          ✏️ Create custom workout instead
        </button>
      </div>

      <!-- STEP 2: Details Form -->
      <div v-if="step === 2">
        <div class="modal-header">
          <button class="back-btn" @click="step = 1">← Back</button>
          <h3>{{ isEditing ? 'Edit Workout' : 'Set Details' }}</h3>
          <button class="close-btn" @click="$emit('cancel')">✕</button>
        </div>

        <div class="details-layout">
          <div class="preview-image" v-if="selectedImage">
            <img :src="selectedImage" :alt="form.name" />
            <div class="preview-overlay">
              <h3>{{ form.name }}</h3>
              <span class="cat-tag">{{ form.category }}</span>
            </div>
          </div>

          <div class="details-form">
            <div class="form-group" v-if="isCustom">
              <label>Workout Name *</label>
              <input v-model="form.name" placeholder="e.g. My Workout" required />
            </div>

            <div class="form-group">
              <label>Duration (mins) *</label>
              <input v-model="form.duration" type="number" min="1" placeholder="e.g. 30" required />
            </div>

            <div class="form-group">
              <label>Sets <span class="optional">(optional)</span></label>
              <input v-model="form.sets" type="number" min="1" placeholder="e.g. 3" />
            </div>

            <div class="form-group">
              <label>Reps <span class="optional">(optional)</span></label>
              <input v-model="form.reps" type="number" min="1" placeholder="e.g. 10" />
            </div>

            <p v-if="error" class="error-msg">{{ error }}</p>

            <button class="submit-btn" :disabled="loading || !form.duration" @click="handleSubmit">
              {{ loading ? 'Saving...' : isEditing ? 'Update Workout' : 'Add Workout' }}
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useWorkoutStore } from '../stores/workouts'
import { sampleWorkouts } from '../data/sampleWorkouts.js'
import { getWorkoutImage } from '../data/workoutImages.js'

const props = defineProps({
  workout: { type: Object, default: null }
})
const emit = defineEmits(['cancel', 'saved'])

const workoutStore = useWorkoutStore()
const loading = ref(false)
const error = ref('')
const step = ref(1)
const search = ref('')
const selectedCategory = ref('All')
const pickedImage = ref('')
const isCustom = ref(false)
const isEditing = ref(false)

const form = ref({ name: '', duration: '', sets: '', reps: '', category: '' })

const selectedImage = computed(() => {
  if (isCustom.value) return getWorkoutImage(form.value.name)
  return pickedImage.value
})

const categories = computed(() => {
  const cats = [...new Set(sampleWorkouts.map(w => w.category))]
  return ['All', ...cats]
})

const filteredWorkouts = computed(() => {
  return sampleWorkouts.filter(w => {
    const matchSearch = w.name.toLowerCase().includes(search.value.toLowerCase())
    const matchCat = selectedCategory.value === 'All' || w.category === selectedCategory.value
    return matchSearch && matchCat
  })
})

watch(() => props.workout, (val) => {
  if (val) {
    isEditing.value = true
    form.value = { ...val }
    pickedImage.value = getWorkoutImage(val.name)
    step.value = 2
  }
}, { immediate: true })

function selectWorkout(workout) {
  form.value.name = workout.name
  form.value.category = workout.category
  form.value.duration = workout.duration
  pickedImage.value = workout.image
  isCustom.value = false
  step.value = 2
}

function selectCustom() {
  form.value = { name: '', duration: '', sets: '', reps: '', category: 'Custom' }
  pickedImage.value = ''
  isCustom.value = true
  step.value = 2
}

async function handleSubmit() {
  if (!form.value.duration) return
  error.value = ''
  loading.value = true
  try {
    if (isEditing.value) {
      await workoutStore.updateWorkout(props.workout._id, form.value)
    } else {
      await workoutStore.addWorkout(form.value)
    }
    emit('saved')
  } catch (err) {
    error.value = err.response?.data?.message || 'Something went wrong.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.form-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
  backdrop-filter: blur(4px);
}

.form-modal {
  background: #1a1a1a;
  border: 1px solid #2e2e2e;
  border-radius: 20px;
  width: 100%;
  max-width: 780px;
  max-height: 85vh;
  overflow-y: auto;
  padding: 28px;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.modal-header h3 {
  font-size: 1.2rem;
  color: #fff;
}

.close-btn {
  background: transparent;
  border: none;
  color: #888;
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #fff;
}

.back-btn {
  background: transparent;
  border: none;
  color: #4ade80;
  font-size: 0.9rem;
  cursor: pointer;
}

.search-input {
  width: 100%;
  padding: 11px 14px;
  background: #111;
  border: 1px solid #2e2e2e;
  border-radius: 10px;
  color: #fff;
  font-size: 0.95rem;
  outline: none;
  margin-bottom: 14px;
  transition: border 0.2s;
}

.search-input:focus {
  border-color: #4ade80;
}

.category-filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.cat-btn {
  padding: 6px 14px;
  background: #111;
  border: 1px solid #2e2e2e;
  border-radius: 20px;
  color: #aaa;
  font-size: 0.82rem;
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

.picker-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
  max-height: 380px;
  overflow-y: auto;
}

.picker-card {
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid #2e2e2e;
  cursor: pointer;
  transition: all 0.2s;
}

.picker-card:hover {
  border-color: #4ade80;
  transform: translateY(-3px);
}

.picker-card img {
  width: 100%;
  height: 110px;
  object-fit: cover;
}

.picker-card-info {
  padding: 10px;
  background: #111;
}

.picker-card-info h4 {
  font-size: 0.88rem;
  color: #fff;
  margin-bottom: 4px;
}

.cat-tag {
  font-size: 0.72rem;
  color: #4ade80;
  background: rgba(74, 222, 128, 0.1);
  padding: 2px 8px;
  border-radius: 10px;
}

.custom-btn {
  width: 100%;
  padding: 12px;
  background: transparent;
  border: 1px dashed #444;
  border-radius: 10px;
  color: #888;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.custom-btn:hover {
  border-color: #4ade80;
  color: #4ade80;
}

.details-layout {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.preview-image {
  flex: 1;
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  min-width: 220px;
}

.preview-image img {
  width: 100%;
  height: 280px;
  object-fit: cover;
}

.preview-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.85));
  padding: 20px 16px 16px;
}

.preview-overlay h3 {
  color: #fff;
  font-size: 1.1rem;
  margin-bottom: 4px;
}

.details-form {
  flex: 1;
}

.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  font-size: 0.85rem;
  color: #aaa;
  margin-bottom: 6px;
}

.optional {
  color: #555;
  font-size: 0.78rem;
}

input {
  width: 100%;
  padding: 11px 13px;
  background: #111;
  border: 1px solid #2e2e2e;
  border-radius: 8px;
  color: #fff;
  font-size: 0.9rem;
  outline: none;
  transition: border 0.2s;
}

input:focus {
  border-color: #4ade80;
}

.submit-btn {
  width: 100%;
  padding: 13px;
  background: #4ade80;
  color: #000;
  font-weight: 700;
  font-size: 1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 8px;
  transition: background 0.2s;
}

.submit-btn:hover:not(:disabled) {
  background: #22c55e;
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.error-msg {
  color: #f87171;
  font-size: 0.85rem;
  margin-bottom: 10px;
}
</style>