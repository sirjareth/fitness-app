import { defineStore } from 'pinia'
import api from '../api/axios'

export const useWorkoutStore = defineStore('workouts', {
  state: () => ({
    workouts: []
  }),
  actions: {
    async fetchWorkouts() {
      const res = await api.get('/workouts/getMyWorkouts')
      console.log('WORKOUTS RESPONSE:', res.data)
      this.workouts = res.data.workouts || []
    },
    async addWorkout(workout) {
      const res = await api.post('/workouts/addWorkout', workout)
      await this.fetchWorkouts() // re-fetch para updated
    },
    async updateWorkout(id, data) {
      const res = await api.patch(`/workouts/updateWorkout/${id}`, {
        name: data.name,
        duration: data.duration
      })
      await this.fetchWorkouts()
    },
    async deleteWorkout(id) {
      await api.delete(`/workouts/deleteWorkout/${id}`);
      await this.fetchWorkouts()
    },
    async completeWorkout(id) {
      await api.patch(`/workouts/completeWorkoutStatus/${id}`)
      await this.fetchWorkouts()
    }
  }
})