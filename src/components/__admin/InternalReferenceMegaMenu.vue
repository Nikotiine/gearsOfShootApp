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
                push({ name: RouterEnum.CALIBER_NEW })
              }
            },
            {
              label: t('adminNavbar.bodyType'),
              command: () => {
                push({ name: RouterEnum.BODY_TYPE_NEW })
              }
            },
            {
              label: t('adminNavbar.headType'),
              command: () => {
                push({ name: RouterEnum.HEAD_TYPE_NEW })
              }
            },
            {
              label: t('adminNavbar.weaponType'),
              command: () => {
                push({ name: RouterEnum.WEAPON_TYPE_NEW })
              }
            },
            {
              label: t('adminNavbar.threadSize'),
              command: () => {
                push({ name: RouterEnum.THREADED_SIZE_NEW })
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
                push({ name: RouterEnum.FACTORY_NEW })
              }
            },

            {
              label: t('global.material'),
              command: () => {
                push({ name: RouterEnum.MAGAZINE_NEW })
              }
            },
            {
              label: t('global.colors'),
              command: () => {
                push({ name: RouterEnum.COLOR_NEW })
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
