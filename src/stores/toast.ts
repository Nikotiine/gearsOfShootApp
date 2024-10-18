import { defineStore } from 'pinia'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'

export const useToastStore = defineStore('toast', () => {
  const toast = useToast()
  const { t } = useI18n()
  function successMessage(summary: string, message: string) {
    toast.add({ severity: 'info', summary: t(summary), detail: t(message), life: 3000 })
  }
  return { successMessage }
})
