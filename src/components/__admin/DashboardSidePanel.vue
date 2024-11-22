<template>
  <MegaMenu :model="items" orientation="vertical" class="mr-4 w-8/12 mt-12" />
</template>
<script setup lang="ts">
import MegaMenu from 'primevue/megamenu'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

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
                push('/admin/gestion/add/optic')
              }
            },
            {
              label: 'Chargeur',
              command: () => {
                push('/admin/gestion/add/weaponMagazine')
              }
            },
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
            {
              label: 'Filletage',
              command: () => {
                push('/admin/gestion/add/threaded-size')
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
                push('/admin/gestion/list/weapon/B')
              }
            },
            { label: 'rds' },
            {
              label: 'Munition',
              command: () => {
                push('/admin/gestion/list/ammunition/B')
              }
            },
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
                push('/admin/gestion/list/weapon/C')
              }
            },
            { label: 'rds' },
            {
              label: 'Munition',
              command: () => {
                push('/admin/gestion/list/ammunition/C')
              }
            },
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
            {
              label: 'Marques',
              command: () => {
                push('/admin/gestion/list/factories')
              }
            },
            { label: 'Training' }
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
