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
import RiffleListComponent from '@/components/__weapon/riffle/RiffleTableComponent.vue'
import { computed } from 'vue'
import HandGunListComponent from '@/components/__weapon/handgun/HandGunTableComponent.vue'
import type { WeaponViewType } from '@/views/weapon/AdminWeaponView.vue'
import { WeaponEnum } from '@/enum/weapon.enum'

const { category, type } = defineProps<{
  category: string
  type: WeaponViewType
}>()

const isRiffleType = computed(() => {
  return type === WeaponEnum.RIFFLE
})
</script>

<style scoped></style>
