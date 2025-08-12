import { defineStore } from 'pinia'
import type { FormStatus } from '@/types/form-status.type'
import { ref } from 'vue'

export const useFormStore = defineStore('form-status-store', () => {
  const status = ref<FormStatus>('save')
  function getFormStatus() {
    return status.value
  }
  function setFormStatus(value: FormStatus) {
    status.value = value
  }
  return {
    getFormStatus,
    setFormStatus
  }
})
