<template>
  <MegaMenu :model="items" orientation="vertical" class="mr-4 w-8/12 mt-12" />
</template>
<script setup lang="ts">
import MegaMenu from 'primevue/megamenu'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { LegislationCategory } from '@/stores/weapon-category'
import { RouterEnum } from '@/enum/router.enum'
import { WeaponEnum } from '@/enum/weapon.enum'

const RIFFLE: string = 'Arme longue'

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
                push({ name: RouterEnum.WEAPON_NEW })
              }
            },
            {
              label: 'Munition',
              command: () => {
                push({ name: RouterEnum.AMMUNITION_NEW })
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
                push({ name: RouterEnum.BODY_TYPE_NEW })
              }
            },
            {
              label: 'Ovige',
              command: () => {
                push({ name: RouterEnum.HEAD_TYPE_NEW })
              }
            },
            {
              label: 'Type d arme',
              command: () => {
                push({ name: RouterEnum.WEAPON_TYPE_NEW })
              }
            },
            {
              label: 'Filletage',
              command: () => {
                push({ name: RouterEnum.THREADED_SIZE_NEW })
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
                push({ name: RouterEnum.FACTORY_NEW })
              }
            },
            {
              label: 'Calibre',
              command: () => {
                push({ name: RouterEnum.CALIBER_NEW })
              }
            },
            {
              label: 'Matieres',
              command: () => {
                push({ name: RouterEnum.MAGAZINE_NEW })
              }
            },
            {
              label: 'Couleur',
              command: () => {
                push({ name: RouterEnum.COLOR_NEW })
              }
            }
          ]
        }
      ],
      [
        {
          label: 'Accessoires',
          items: [
            {
              label: 'Collier d optique',
              command: () => {
                push({ name: RouterEnum.OPTIC_COLLAR_NEW })
              }
            },
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
                push({
                  name: RouterEnum.WEAPON_LIST,
                  params: { type: WeaponEnum.HAND_GUN, category: LegislationCategory.B }
                })
              }
            },
            {
              label: RIFFLE,
              command: () => {
                push({
                  name: RouterEnum.WEAPON_LIST,
                  params: { type: WeaponEnum.RIFFLE, category: LegislationCategory.B }
                })
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
                push({
                  name: RouterEnum.AMMUNITION_LIST,
                  params: { category: LegislationCategory.B }
                })
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
                push({
                  name: RouterEnum.WEAPON_LIST,
                  params: { type: WeaponEnum.RIFFLE, category: LegislationCategory.C }
                })
              }
            },
            { label: 'rds' },
            {
              label: 'Munition',
              command: () => {
                push({
                  name: RouterEnum.AMMUNITION_LIST,
                  params: { category: LegislationCategory.C }
                })
              }
            },
            {
              label: 'Chargeur',
              command: () => {
                push({
                  name: RouterEnum.MAGAZINE_LIST,
                  params: { category: LegislationCategory.C }
                })
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
                push({
                  name: RouterEnum.WEAPON_LIST,
                  params: { type: WeaponEnum.HAND_GUN, category: LegislationCategory.D }
                })
              }
            },
            {
              label: RIFFLE,
              command: () => {
                push({
                  name: RouterEnum.WEAPON_LIST,
                  params: { type: WeaponEnum.RIFFLE, category: LegislationCategory.D }
                })
              }
            },
            {
              label: 'Munition',
              command: () => {
                push({
                  name: RouterEnum.AMMUNITION_LIST,
                  params: { category: LegislationCategory.D }
                })
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
            { label: 'Collier', command: () => push({ name: RouterEnum.OPTIC_COLLAR_LIST }) },
            { label: 'Type d arme' },
            {
              label: 'Marques',
              command: () => {
                push({ name: RouterEnum.FACTORY_LIST })
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
