import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type RouteLocationRaw, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

export interface BreadCrumbState {
  label: string
  index: number
  to: RouteLocationRaw
  icon?: string
}

export const useBreadcrumbStore = defineStore('breadcrumb-store', () => {
  const _SESSION_STORAGE_KEY = 'breadcrumb'
  const { t } = useI18n()
  const breadcrumbs = ref<BreadCrumbState[]>([])
  const router = useRouter()

  function goToStep(breadcrumb: BreadCrumbState) {
    breadcrumbs.value = breadcrumbs.value.filter((s) => s.index <= breadcrumb.index)
    updateSessionStorage(breadcrumbs.value)
    router.push(breadcrumb.to)
  }

  function setStep(breadcrumb: BreadCrumbState) {
    const stepsInStorage = sessionStorage.getItem(_SESSION_STORAGE_KEY)

    if (stepsInStorage) {
      try {
        breadcrumbs.value = JSON.parse(stepsInStorage) as BreadCrumbState[]
      } catch {
        breadcrumbs.value = []
      }
    }

    const existingIndex = breadcrumbs.value.findIndex((s) => s.index === breadcrumb.index)

    if (existingIndex !== -1) {
      breadcrumbs.value[existingIndex] = breadcrumb
      breadcrumbs.value = breadcrumbs.value.slice(0, existingIndex + 1)
    } else {
      breadcrumbs.value.push(breadcrumb)
    }

    updateSessionStorage(breadcrumbs.value)
  }

  function updateSessionStorage(breadcrumb: BreadCrumbState[]) {
    sessionStorage.setItem(_SESSION_STORAGE_KEY, JSON.stringify(breadcrumb))
  }

  function createListLabelWithCategory(
    prefix: string,
    category?: string,
    label: string = 'breadcrumbList'
  ) {
    return `${t(`${prefix}.${label}`, { key: category })}`
  }
  function createLabel(prefix: string, label: string = 'detail') {
    return `${t(`${prefix}${label}`)}`
  }
  return {
    breadcrumbs,
    goToStep,
    setStep,
    createListLabelWithCategory,
    createLabel
  }
})
