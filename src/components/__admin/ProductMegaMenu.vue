<template>
  <MegaMenu :model="items" orientation="vertical" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { MenuItem } from 'primevue/menuitem'
import { AdminRouterEnum } from '@/enum/router/admin-router.enum'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import MegaMenu from 'primevue/megamenu'

const { t } = useI18n()
const { push } = useRouter()

const items = ref<MenuItem[]>([
  {
    label: t('dashboard.product'),
    icon: 'pi pi-plus',
    items: [
      [
        {
          label: t('dashboard.product'),
          items: [
            {
              label: t('global.handgun'),
              command: () => {
                push({ name: AdminRouterEnum.HANDGUN_NEW })
              }
            },
            {
              label: t('global.riffle'),
              command: () => {
                push({ name: AdminRouterEnum.RIFFLE_NEW })
              }
            },
            {
              label: t('global.ammunition'),
              command: () => {
                push({ name: AdminRouterEnum.AMMUNITION_NEW })
              }
            },
            {
              label: t('global.magazine'),
              command: () => {
                push({ name: AdminRouterEnum.MAGAZINE_NEW })
              }
            }
          ]
        }
      ],
      [
        {
          label: t('global.optic'),
          items: [
            {
              label: t('global.optic'),
              command: () => {
                push({ name: AdminRouterEnum.OPTIC_NEW })
              }
            },
            {
              label: t('global.collar'),
              command: () => {
                push({ name: AdminRouterEnum.OPTIC_COLLAR_NEW })
              }
            }
          ]
        }
      ],
      [
        {
          label: t('global.accessories'),
          items: [
            {
              label: t('global.rds'),
              command: () => {
                push({ name: AdminRouterEnum.RDS_NEW })
              }
            }
          ]
        }
      ]
    ]
  }
])
</script>

<style scoped></style>
