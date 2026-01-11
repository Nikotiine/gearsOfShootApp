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
    label: t('adminNavbar.internalReference'),
    icon: 'pi pi-plus',
    items: [
      [
        {
          label: t('adminNavbar.specificWeapons'),
          items: [
            {
              label: t('global.caliber'),
              command: () => {
                push({ name: AdminRouterEnum.CALIBER_NEW })
              }
            },
            {
              label: t('adminNavbar.bodyType'),
              command: () => {
                push({ name: AdminRouterEnum.BODY_TYPE_NEW })
              }
            },
            {
              label: t('adminNavbar.headType'),
              command: () => {
                push({ name: AdminRouterEnum.HEAD_TYPE_NEW })
              }
            },
            {
              label: t('adminNavbar.weaponType'),
              command: () => {
                push({ name: AdminRouterEnum.WEAPON_TYPE_NEW })
              }
            },
            {
              label: t('adminNavbar.threadSize'),
              command: () => {
                push({ name: AdminRouterEnum.THREADED_SIZE_NEW })
              }
            }
          ]
        }
      ],
      [
        {
          label: t('adminNavbar.commonReference'),
          items: [
            {
              label: t('global.factory'),
              command: () => {
                push({ name: AdminRouterEnum.FACTORY_NEW })
              }
            },

            {
              label: t('global.material'),
              command: () => {
                push({ name: AdminRouterEnum.MAGAZINE_NEW })
              }
            },
            {
              label: t('global.colors'),
              command: () => {
                push({ name: AdminRouterEnum.COLOR_NEW })
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
