<template>
  <MegaMenu :model="items" orientation="vertical" class="mr-4 max-w-fit" />
</template>
<script setup lang="ts">
import MegaMenu from 'primevue/megamenu'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { LegislationCategory } from '@/stores/legalisation-category.store'
import { RouterEnum } from '@/enum/router.enum'
import { WeaponEnum } from '@/enum/weapon.enum'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const RIFFLE: string = 'Arme longue'
const HAND_GUN: string = 'Arme de poing'
const I18N_PREFIX: string = 'dashboard.'
const { push } = useRouter()
const items = ref([
  {
    label: t(I18N_PREFIX + 'home'),
    icon: 'pi pi-home',
    command: () => {
      push({ name: RouterEnum.ADMIN_DASHBOARD })
    }
  },
  {
    label: t(I18N_PREFIX + 'newProduct'),
    icon: 'pi pi-plus',
    items: [
      [
        {
          label: t(I18N_PREFIX + 'product'),
          items: [
            {
              label: 'Arme de poing',
              command: () => {
                push({ name: RouterEnum.HANDGUN_NEW })
              }
            },
            {
              label: 'Arme longue',
              command: () => {
                push({ name: RouterEnum.RIFFLE_NEW })
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
            {
              label: 'RDS',
              command: () => {
                push({ name: RouterEnum.RDS_NEW })
              }
            }
          ]
        }
      ],
      [
        {
          label: 'Specifique arme',
          items: [
            {
              label: 'Calibre',
              command: () => {
                push({ name: RouterEnum.CALIBER_NEW })
              }
            },
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
          label: 'Details communs',
          items: [
            {
              label: 'Marques',
              command: () => {
                push({ name: RouterEnum.FACTORY_NEW })
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
      ]
    ]
  },
  {
    label: 'Liste',
    icon: 'pi pi-list',
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
                  name: RouterEnum.MAGAZINE_LIST
                })
              }
            },
            {
              label: 'Munition',
              command: () => {
                push({
                  name: RouterEnum.AMMUNITION_LIST
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
            { label: 'RDS', command: () => push({ name: RouterEnum.RDS_LIST }) },
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
    icon: 'pi pi-users',
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
