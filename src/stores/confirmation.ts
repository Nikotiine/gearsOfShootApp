import { defineStore } from 'pinia'

import { useConfirm } from 'primevue/useconfirm'
import { useI18n } from 'vue-i18n'
import type { DrawerType } from '@/types/form-type'
export const useConfirmationStore = defineStore('confirmation', () => {
  const confirmDialog = useConfirm()

  const { t } = useI18n()
  const confirmDelete = (type: DrawerType, reference: string): Promise<boolean> => {
    return new Promise((resolve) => {
      confirmDialog.require({
        message: `${t('confirmDialog.deleteConfirmation')} ${t('global.' + type).toUpperCase()} ${t('confirmDialog.withReference')} ${reference}`,
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
          label: t('global.cancel'),
          severity: 'secondary',
          outlined: true
        },
        acceptProps: {
          label: t('global.delete')
        },
        accept: () => {
          resolve(true) // ✅ Résout la promesse avec `true`
        },
        reject: () => {
          resolve(false) // ✅ Résout la promesse avec `false`
        }
      })
    })
  }
  return {
    confirmDelete
  }
})
