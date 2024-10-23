<template>
  <MegaMenu :model="items" orientation="vertical" class="mr-4 w-8/12 mt-12" />
</template>
<script setup lang="ts">
import MegaMenu from 'primevue/megamenu'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import type { LegislationCategories } from '@/stores/weapon'
import { FactoryDtoTypeEnum, WeaponDtoCategoryEnum } from '@/api/Api'
const { push } = useRouter()
const items = ref([
  {
    label: 'Categorie C',
    icon: 'pi pi-box',
    items: [
      [
        {
          label: 'Arme',
          items: [
            {
              label: 'Liste complete',
              command: () => {
                push('/admin/gestion/list/weapon/' + WeaponDtoCategoryEnum.C)
              }
            },
            {
              label: 'Nouvelle reference',
              command: () => {
                push('/admin/gestion/add/weapon/' + WeaponDtoCategoryEnum.C)
              }
            },
            {
              label: 'Marque',
              command: () => {
                push('/admin/gestion/add/factory/' + FactoryDtoTypeEnum.Arme)
              }
            }
          ]
        },
        {
          label: 'Munition',
          items: [
            {
              label: 'Liste complete',
              command: () => {
                push('/admin/gestion/list/ammunition/' + WeaponDtoCategoryEnum.C)
              }
            },
            {
              label: 'Nouvelle reference',
              command: () => {
                push('/admin/gestion/add/ammunition/' + WeaponDtoCategoryEnum.C)
              }
            },
            { label: 'Marque' }
          ]
        }
      ],
      [
        {
          label: 'RDS',
          items: [{ label: 'Liste complete' }, { label: 'Nouvelle reference' }, { label: 'Marque' }]
        },
        {
          label: 'Accessoire',
          items: [{ label: 'Liste complete' }, { label: 'Nouvelle reference' }, { label: 'Marque' }]
        }
      ],
      [
        {
          label: 'Stock',
          items: [
            { label: 'Bed' },
            { label: 'Chaise lounge' },
            { label: 'Cupboard' },
            { label: 'Dresser' },
            { label: 'Wardrobe' }
          ]
        }
      ]
    ]
  },
  {
    label: 'Categorie B',
    icon: 'pi pi-box',
    items: [
      [
        {
          label: 'Arme',
          items: [
            {
              label: 'Liste complete',
              command: () => {
                push('/admin/gestion/list/weapon/' + WeaponDtoCategoryEnum.B)
              }
            },
            {
              label: 'Nouvelle reference',
              command: () => {
                push('/admin/gestion/add/weapon/' + WeaponDtoCategoryEnum.B)
              }
            },
            { label: 'Marque' }
          ]
        },
        {
          label: 'Munition',
          items: [
            {
              label: 'Liste complete',
              command: () => {
                push('/admin/gestion/list/ammunition/' + WeaponDtoCategoryEnum.B)
              }
            },
            {
              label: 'Nouvelle reference',
              command: () => {
                push('/admin/gestion/add/ammunition/' + WeaponDtoCategoryEnum.B)
              }
            },
            { label: 'Marque' }
          ]
        }
      ],
      [
        {
          label: 'RDS',
          items: [{ label: 'Liste complete' }, { label: 'Nouvelle reference' }, { label: 'Marque' }]
        },
        {
          label: 'Accessoire',
          items: [{ label: 'Liste complete' }, { label: 'Nouvelle reference' }, { label: 'Marque' }]
        }
      ],
      [
        {
          label: 'Stock',
          items: [
            { label: 'Bed' },
            { label: 'Chaise lounge' },
            { label: 'Cupboard' },
            { label: 'Dresser' },
            { label: 'Wardrobe' }
          ]
        }
      ]
    ]
  },
  {
    label: 'Loisir',
    icon: 'pi pi-clock',
    items: [
      [
        {
          label: 'Football',
          items: [{ label: 'Kits' }, { label: 'Shoes' }, { label: 'Shorts' }, { label: 'Training' }]
        }
      ],
      [
        {
          label: 'Running',
          items: [
            { label: 'Accessories' },
            { label: 'Shoes' },
            { label: 'T-Shirts' },
            { label: 'Shorts' }
          ]
        }
      ],
      [
        {
          label: 'Swimming',
          items: [
            { label: 'Kickboard' },
            { label: 'Nose Clip' },
            { label: 'Swimsuits' },
            { label: 'Paddles' }
          ]
        }
      ],
      [
        {
          label: 'Tennis',
          items: [
            { label: 'Balls' },
            { label: 'Rackets' },
            { label: 'Shoes' },
            { label: 'Training' }
          ]
        }
      ]
    ]
  }
])
</script>

<style scoped></style>
