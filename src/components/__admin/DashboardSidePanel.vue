<template>
  <MegaMenu :model="items" orientation="vertical" class="mr-4 w-8/12 mt-12" />
</template>
<script setup lang="ts">
import MegaMenu from 'primevue/megamenu'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { WeaponDtoCategoryEnum } from '@/api/Api'
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
            { label: 'Optique' },
            { label: 'RDS' },
            { label: 'Accessories' }
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
            { label: 'Filletage' },
            { label: 'Accessoire' }
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
            { label: 'Calibre' },
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
    label: 'Liste',
    icon: 'pi pi-clock',
    items: [
      [
        {
          label: 'Categorie B',
          items: [
            { label: 'Arme de poing' },
            {
              label: 'Arme longue',
              command: () => {
                push('/admin/gestion/list/weapon/' + WeaponDtoCategoryEnum.B)
              }
            },
            { label: 'rds' },
            { label: 'Munition' },
            { label: 'Accessoire' }
          ]
        }
      ],
      [
        {
          label: 'Categorie C',
          items: [
            {
              label: 'Arme longue',
              command: () => {
                push('/admin/gestion/list/weapon/' + WeaponDtoCategoryEnum.C)
              }
            },
            { label: 'rds' },
            { label: 'Munition' },
            { label: 'Accessoire' }
          ]
        }
      ],
      [
        {
          label: 'Categorie D',
          items: [
            { label: 'Arme de poing' },
            { label: 'Arme longue' },
            { label: 'Munition' },
            { label: 'Accessoire' }
          ]
        }
      ],
      [
        {
          label: 'Autre',
          items: [
            { label: 'Douille et oviges' },
            { label: 'Type d arme' },
            { label: 'Shoes' },
            { label: 'Training' }
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
