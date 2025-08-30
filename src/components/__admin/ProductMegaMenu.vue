<template>
  <MegaMenu :model="items" orientation="vertical" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { MenuItem } from 'primevue/menuitem'
import { RouterEnum } from '@/enum/router.enum'
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
                push({ name: RouterEnum.HANDGUN_NEW })
              }
            },
            {
              label: t('global.riffle'),
              command: () => {
                push({ name: RouterEnum.RIFFLE_NEW })
              }
            },
            {
              label: t('global.ammunition'),
              command: () => {
                push({ name: RouterEnum.AMMUNITION_NEW })
              }
            },
            {
              label: t('global.magazine'),
              command: () => {
                push({ name: RouterEnum.MAGAZINE_NEW })
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
                push({ name: RouterEnum.OPTIC_NEW })
              }
            },
            {
              label: t('global.collar'),
              command: () => {
                push({ name: RouterEnum.OPTIC_COLLAR_NEW })
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
                push({ name: RouterEnum.RDS_NEW })
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
