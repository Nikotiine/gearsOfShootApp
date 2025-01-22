<template>
  <div class="card p-4">
    <h2 class="text-center mt-2 text-2xl">
      Liste des {{ isRiffleType ? 'arme longue' : 'arme de poing' }} de Categorie
      {{ category }}
    </h2>

    <riffle-list-component :category="category" v-if="isRiffleType" />
    <hand-gun-list-component :category="category" v-if="!isRiffleType" />
  </div>
</template>
<script setup lang="ts">
import RiffleListComponent from '@/components/__weapon/RiffleListComponent.vue'
import { computed } from 'vue'
import HandGunListComponent from '@/components/__weapon/HandGunListComponent.vue'
import type { WeaponViewType } from '@/views/weapon/WeaponView.vue'

const { category, type } = defineProps<{
  category: string
  type: WeaponViewType
}>()

const isRiffleType = computed(() => {
  return type === 'riffle'
})
</script>

<style scoped></style>
