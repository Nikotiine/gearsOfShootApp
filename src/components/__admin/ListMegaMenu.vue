<template>
  <MegaMenu :model="items" orientation="vertical" />
</template>
<script setup lang="ts">
import MegaMenu from 'primevue/megamenu'
import { ref } from 'vue'
import type { MenuItem } from 'primevue/menuitem'
import { LegislationCategory } from '@/stores/legalisation-category.store'
import { AdminRouterEnum } from '@/enum/router/admin-router.enum'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const { push } = useRouter()

const items = ref<MenuItem[]>([
  {
    label: t('dashboard.productList'),
    icon: 'pi pi-list',
    items: [
      [
        {
          label: `${t('global.category')} ${LegislationCategory.B}`,
          items: [
            {
              label: t('global.handgun'),
              command: () => {
                push({
                  name: AdminRouterEnum.HANDGUN_LIST,
                  params: { category: LegislationCategory.B }
                })
              }
            },
            {
              label: t('global.riffle'),
              command: () => {
                push({
                  name: AdminRouterEnum.RIFFLE_LIST,
                  params: { category: LegislationCategory.B }
                })
              }
            },
            {
              label: t('global.magazine'),
              command: () => {
                push({
                  name: AdminRouterEnum.MAGAZINE_LIST,
                  params: { category: LegislationCategory.B }
                })
              }
            },
            {
              label: t('global.ammunition'),
              command: () => {
                push({
                  name: AdminRouterEnum.AMMUNITION_LIST,
                  params: { category: LegislationCategory.B }
                })
              }
            }
          ]
        }
      ],
      [
        {
          label: `${t('global.category')} ${LegislationCategory.C}`,
          items: [
            {
              label: t('global.riffle'),
              command: () => {
                push({
                  name: AdminRouterEnum.RIFFLE_LIST,
                  params: { category: LegislationCategory.C }
                })
              }
            },
            {
              label: t('global.blackPowderWeapon'),
              command: () => {
                //TODO: A faire
                console.log('A faire')
                /* push({
                  name: AdminRouterEnum.WEAPON_LIST,
                  params: { type: WeaponEnum.RIFFLE, category: LegislationCategory.C }
                })*/
              }
            },
            {
              label: t('global.magazine'),
              command: () => {
                push({
                  name: AdminRouterEnum.MAGAZINE_LIST,
                  params: { category: LegislationCategory.C }
                })
              }
            },
            {
              label: t('global.ammunition'),
              command: () => {
                push({
                  name: AdminRouterEnum.AMMUNITION_LIST,
                  params: { category: LegislationCategory.C }
                })
              }
            }
          ]
        }
      ],
      [
        {
          label: `${t('global.category')} ${LegislationCategory.D}`,
          items: [
            {
              label: t('global.handgun'),
              command: () => {
                push({
                  name: AdminRouterEnum.HANDGUN_LIST,
                  params: { category: LegislationCategory.D }
                })
              }
            },
            {
              label: t('global.riffle'),
              command: () => {
                push({
                  name: AdminRouterEnum.RIFFLE_LIST,
                  params: { category: LegislationCategory.D }
                })
              }
            },
            {
              label: t('global.ammunition'),
              command: () => {
                push({
                  name: AdminRouterEnum.AMMUNITION_LIST,
                  params: { category: LegislationCategory.D }
                })
              }
            }
          ]
        }
      ],
      [
        {
          label: 'Autre',
          items: [
            { label: 'Optiques', command: () => push({ name: AdminRouterEnum.OPTIC_LIST }) },
            { label: 'Collier', command: () => push({ name: AdminRouterEnum.OPTIC_COLLAR_LIST }) },
            { label: 'RDS', command: () => push({ name: AdminRouterEnum.RDS_LIST }) },
            {
              label: 'Marques',
              command: () => {
                push({ name: AdminRouterEnum.FACTORY_LIST })
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
