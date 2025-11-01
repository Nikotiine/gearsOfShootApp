import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOrderStatusStore = defineStore('order-status-store', () => {
  const disableSelectStatus = ref<boolean>(true)
  return {
    disableSelectStatus$: disableSelectStatus
  }
})
