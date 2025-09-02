import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useFormStore } from '@/stores/form.store'
import { useI18n } from 'vue-i18n'
import { getI18NPrefix } from '@/enum/I18NSuffix.enum'

export interface BreadCrumbState {
  label: string
  index: number
  path: string
  icon?: string
}

export const useBreadcrumbStore = defineStore('breadcrumb-store', () => {
  const _SESSION_STORAGE_KEY = 'breadcrumb'
  const formStore = useFormStore()
  const { t } = useI18n()
  const breadcrumbs = ref<BreadCrumbState[]>([])
  const router = useRouter()
  function goToStep(breadcrumb: BreadCrumbState) {
    breadcrumbs.value = breadcrumbs.value.filter((s) => s.index <= breadcrumb.index)
    updateSessionStorage(breadcrumbs.value)
    router.push({ path: breadcrumb.path })
  }

  function setStep(breadcrumb: BreadCrumbState) {
    const stepsInStorage = sessionStorage.getItem(_SESSION_STORAGE_KEY)
    if (stepsInStorage) {
      try {
        breadcrumbs.value = JSON.parse(stepsInStorage) as BreadCrumbState[]
      } catch (e) {
        breadcrumbs.value = []
      }
    }
    const existingIndex = breadcrumbs.value.findIndex((s) => s.index === breadcrumb.index)
    if (existingIndex !== -1) {
      // Si le path est différent
      if (breadcrumbs.value[existingIndex].path !== breadcrumb.path) {
        // Remplace à cet index
        breadcrumbs.value[existingIndex] = breadcrumb
        // Supprime tous ceux après
        breadcrumbs.value = breadcrumbs.value.slice(0, existingIndex + 1)
      }
    } else {
      // Pas encore dans la liste → on l’ajoute
      breadcrumbs.value.push(breadcrumb)
    }
    updateSessionStorage(breadcrumbs.value)
  }

  function updateSessionStorage(breadcrumb: BreadCrumbState[]) {
    sessionStorage.setItem(_SESSION_STORAGE_KEY, JSON.stringify(breadcrumb))
  }

  function generateLabel(i18nPrefix: string, objectName?: string): string {
    const status = formStore.getFormStatus()
    return `${t('breadcrumb.' + status)} ${t(getI18NPrefix(i18nPrefix) + 'breadcrumb')}  ${objectName ? ': ' + objectName : ''}`
  }

  return {
    breadcrumbs,
    goToStep,
    setStep,
    generateLabel
  }
})
