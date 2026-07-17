import { defineStore } from 'pinia'

import { useConfirm } from 'primevue/useconfirm'
import { useI18n } from 'vue-i18n'
import type { ActionMenuType } from '@/components/__table/ActionMenuComponent.vue'
import { I18nPrefix } from '@/i18n/i18n-prefix.enum'

export const useConfirmationStore = defineStore('confirmation-store', () => {
  const confirmDialog = useConfirm()
  const _I18N_PREFIX = I18nPrefix.CONFIRMATION_DIALOG
  const _I18N_PREFIX_GLOBAL = I18nPrefix.GLOBAL

  const { t } = useI18n()
  const confirmDelete = (type: ActionMenuType, reference: string): Promise<boolean> => {
    return new Promise((resolve) => {
      confirmDialog.require({
        message: `${t(_I18N_PREFIX + 'deleteConfirmation')} ${t(_I18N_PREFIX_GLOBAL + type).toUpperCase()} ${t(_I18N_PREFIX + 'withReference')} ${reference}`,
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
          label: t(_I18N_PREFIX_GLOBAL + 'cancel'),
          severity: 'secondary',
          outlined: true
        },
        acceptProps: {
          label: t(_I18N_PREFIX_GLOBAL + 'delete')
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
  const confirm = (
    message: string,
    header: string = 'confirm',
    address?: string
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      confirmDialog.require({
        message: `${t(_I18N_PREFIX + message)} ${address}`,
        header: `${t(_I18N_PREFIX + header)}`,
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
          label: t(_I18N_PREFIX_GLOBAL + 'no'),
          severity: 'secondary',
          outlined: true
        },
        acceptProps: {
          label: t(_I18N_PREFIX_GLOBAL + 'yes')
        },
        accept: () => {
          resolve(true) // ✅ Résout la promesse avec `true`
        },
        reject: () => {
          resolve(false) // ✅ Résout la promesse avec `true`
        }
      })
    })
  }
  return {
    confirmDelete,
    confirm
  }
})
