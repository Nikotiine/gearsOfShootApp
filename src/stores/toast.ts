import { defineStore } from 'pinia'
import { useToast } from 'primevue/usetoast'

export const useToastStore = defineStore('toast', () => {
  const toast = useToast()
  function successMessage(summary: string, message: string) {
    toast.add({ severity: 'info', summary: summary, detail: message, life: 3000 })
  }
  return { successMessage }
})
