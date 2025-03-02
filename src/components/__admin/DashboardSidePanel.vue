<template>
  <MegaMenu :model="items" orientation="vertical" class="mr-4 w-8/12 mt-12" />
</template>
<script setup lang="ts">
import MegaMenu from 'primevue/megamenu'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { LegislationCategory } from '@/stores/weapon-category'
import { RouterEnum } from '@/enum/router.enum'
const RIFFLE_LIST_URL: string = '/admin/gestion/list/weapon/riffle/'
const RIFFLE: string = 'Arme longue'
const HAND_GUN_LIST_URL: string = '/admin/gestion/list/weapon/handgun/'
const HAND_GUN: string = 'Arme de poing'
const { push } = useRouter()
const items = ref([
  {
    label: 'Reference',
    icon: 'pi pi-clock',
    items: [
      [
        {
          label: 'Ajout',
          items: [
            {
              label: 'Arme',
              command: () => {
                push('/admin/gestion/add/weapon')
              }
            },
            {
              label: 'Munition',
              command: () => {
                push('/admin/gestion/add/ammunition')
              }
            },
            {
              label: 'Optique',
              command: () => {
                push({ name: RouterEnum.OPTIC_NEW })
              }
            },
            {
              label: 'Chargeur',
              command: () => {
                push({ name: RouterEnum.MAGAZINE_NEW })
              }
            },
            { label: 'RDS' }
          ]
        }
      ],
      [
        {
          label: 'Type',
          items: [
            {
              label: 'Douille',
              command: () => {
                push('/admin/gestion/add/bodyType')
              }
            },
            {
              label: 'Ovige',
              command: () => {
                push('/admin/gestion/add/headType')
              }
            },
            {
              label: 'Type d arme',
              command: () => {
                push('/admin/gestion/add/weaponType')
              }
            },
            {
              label: 'Filletage',
              command: () => {
                push('/admin/gestion/add/threaded-size')
              }
            }
          ]
        }
      ],
      [
        {
          label: 'Autre',
          items: [
            {
              label: 'Marques',
              command: () => {
                push('/admin/gestion/add/factory')
              }
            },
            {
              label: 'Calibre',
              command: () => {
                push('/admin/gestion/add/caliber')
              }
            },
            {
              label: 'Matieres',
              command: () => {
                push('/admin/gestion/add/material')
              }
            },
            {
              label: 'Couleur',
              command: () => {
                push('/admin/gestion/add/color')
              }
            }
          ]
        }
      ],
      [
        {
          label: 'Accessoires',
          items: [
            { label: 'Balls' },
            { label: 'Rackets' },
            { label: 'Shoes' },
            { label: 'Training' }
          ]
        }
      ]
    ]
  },
  {
    label: 'Liste',
    icon: 'pi pi-clock',
    items: [
      [
        {
          label: 'Categorie ' + LegislationCategory.B,
          items: [
            {
              label: HAND_GUN,
              command: () => {
                push(HAND_GUN_LIST_URL + LegislationCategory.B)
              }
            },
            {
              label: RIFFLE,
              command: () => {
                push(RIFFLE_LIST_URL + LegislationCategory.B)
              }
            },
            {
              label: 'Chargeur',
              command: () => {
                push({
                  name: RouterEnum.MAGAZINE_LIST,
                  params: { category: LegislationCategory.B }
                })
              }
            },
            {
              label: 'Munition',
              command: () => {
                push('/admin/gestion/list/ammunition/' + LegislationCategory.B)
              }
            }
          ]
        }
      ],
      [
        {
          label: 'Categorie ' + LegislationCategory.C,
          items: [
            {
              label: RIFFLE,
              command: () => {
                push(RIFFLE_LIST_URL + LegislationCategory.C)
              }
            },
            { label: 'rds' },
            {
              label: 'Munition',
              command: () => {
                push('/admin/gestion/list/ammunition/' + LegislationCategory.C)
              }
            },
            {
              label: 'Chargeur',
              command: () => {
                push('/admin/gestion/magazine/list/' + LegislationCategory.C)
              }
            },
            { label: 'Accessoire' }
          ]
        }
      ],
      [
        {
          label: 'Categorie ' + LegislationCategory.D,
          items: [
            {
              label: HAND_GUN,
              command: () => {
                push(HAND_GUN_LIST_URL + LegislationCategory.D)
              }
            },
            {
              label: RIFFLE,
              command: () => {
                push(RIFFLE_LIST_URL + LegislationCategory.D)
              }
            },
            {
              label: 'Munition',
              command: () => {
                push('/admin/gestion/list/ammunition/' + LegislationCategory.D)
              }
            },
            { label: 'Accessoire' }
          ]
        }
      ],
      [
        {
          label: 'Autre',
          items: [
            { label: 'Optiques', command: () => push({ name: RouterEnum.OPTIC_LIST }) },
            { label: 'Type d arme' },
            {
              label: 'Marques',
              command: () => {
                push('/admin/gestion/list/factories')
              }
            }
          ]
        }
      ]
    ]
  },
  {
    label: 'Stock',
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
  },
  {
    label: 'Utilisateurs',
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
