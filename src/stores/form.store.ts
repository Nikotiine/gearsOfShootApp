import { defineStore } from 'pinia'
import type { FormStatus } from '@/types/form-status.type'
import { ref } from 'vue'

export const useFormStore = defineStore('form-status-store', () => {
  const status = ref<FormStatus>('save')
  const i18nPrefix = ref<string | undefined>('global')
  const currentId = ref<string | undefined>(undefined)
  function getFormStatus() {
    return status.value
  }
  function setFormStatus(value: FormStatus) {
    status.value = value
  }
  function setCurrentId(id: string | undefined) {
    currentId.value = id
  }
  function getFormId() {
    return currentId.value
  }
  function setI18nPrefix(prefix: string | undefined): void {
    i18nPrefix.value = prefix
  }
  function getI18nPrefix(): string {
    return i18nPrefix.value ?? 'global.'
  }
  return {
    getFormStatus,
    setFormStatus,
    setCurrentId,
    getFormId,
    setI18nPrefix,
    getI18nPrefix
  }
})
