<template>
  <div class="card" :class="{ completed: workout.status === 'completed' }">
    <div class="card-header">
      <h3>{{ workout.name }}</h3>
      <span class="status-badge" :class="workout.status">
        {{ workout.status === 'completed' ? '✅ Done' : '🔥 Active' }}
      </span>
    </div>
    <div class="card-info">
      <span>⏱ {{ workout.duration }} mins</span>
      <span v-if="workout.sets">📦 {{ workout.sets }} sets</span>
      <span v-if="workout.reps">🔁 {{ workout.reps }} reps</span>
    </div>
    <div class="card-actions">
      <button class="btn-complete" @click="$emit('complete', workout._id)"
        :disabled="workout.status === 'completed'">
        Mark Done
      </button>
      <button class="btn-edit" @click="$emit('edit', workout)">Edit</button>
      <button class="btn-delete" @click="$emit('delete', workout._id)">Delete</button>
    </div>
  </div>
</template>

<script setup>
defineProps({ workout: Object })
defineEmits(['complete', 'edit', 'delete'])
</script>

<style scoped>
.card {
  background: #1a1a1a;
  border: 1px solid #2e2e2e;
  border-radius: 14px;
  padding: 20px 24px;
  transition: border 0.2s;
}
.card:hover { border-color: #4ade80; }
.card.completed { opacity: 0.6; border-color: #2e2e2e; }
.card-header {
  display: flex; justify-content: space-between;
  align-items: center; margin-bottom: 12px;
}
h3 { font-size: 1.1rem; color: #fff; }
.status-badge {
  font-size: 0.75rem; padding: 4px 10px;
  border-radius: 20px; font-weight: 600;
}
.status-badge.completed { background: #14532d; color: #4ade80; }
.status-badge.pending, .status-badge:not(.completed) { background: #431407; color: #fb923c; }
.card-info {
  display: flex; gap: 16px; color: #aaa;
  font-size: 0.88rem; margin-bottom: 16px;
}
.card-actions { display: flex; gap: 8px; }
.btn-complete {
  padding: 7px 14px; background: #14532d; color: #4ade80;
  border: none; border-radius: 7px; cursor: pointer; font-size: 0.85rem; transition: background 0.2s;
}
.btn-complete:hover:not(:disabled) { background: #166534; }
.btn-complete:disabled { opacity: 0.4; cursor: not-allowed; }
.btn-edit {
  padding: 7px 14px; background: #1e3a5f; color: #60a5fa;
  border: none; border-radius: 7px; cursor: pointer; font-size: 0.85rem; transition: background 0.2s;
}
.btn-edit:hover { background: #1d4ed8; color: #fff; }
.btn-delete {
  padding: 7px 14px; background: #3f1515; color: #f87171;
  border: none; border-radius: 7px; cursor: pointer; font-size: 0.85rem; transition: background 0.2s;
}
.btn-delete:hover { background: #7f1d1d; }
</style>