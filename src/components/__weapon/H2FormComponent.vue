<template>
  <h2 class="text-center mt-16 text-2xl text-blue-500">
    {{ initialState ? 'Votre choix : ' + title : "Quel type d'arme ?" }}
  </h2>
</template>
<script setup lang="ts">
import { type NewWeapon, useWeaponStore } from '@/stores/weapon'
import { storeToRefs } from 'pinia'

import { computed } from 'vue'

const store = useWeaponStore()
const { weaponTypes$, categories$ } = storeToRefs(store)
const { initialState, selectedOptions } = defineProps<{
  initialState: boolean
  selectedOptions: NewWeapon
}>()

const title = computed(() => {
  const category = categories$.value.find((cat) => cat.id === selectedOptions.category)
  const type = weaponTypes$.value.find((type) => type.id === selectedOptions.type)
  return `${type?.name} de categorie ${category?.name}`
})
</script>

<style scoped></style>
