<template>
  <h2 class="text-center text-2xl text-blue-500 mt-4">
    Detail de : {{ weapon.factory.name }} {{ weapon.name }}
  </h2>
  <div class="">
    <p>Marque : {{ weapon.factory.name }}</p>
    <p>Nom : {{ weapon.name }} {{ weapon.variation ? ` - ${weapon.variation}` : '' }}</p>
    <p>
      Longueur de canon : {{ weapon.barrelLength }} cm - Type de canon :
      {{ weapon.barrelType.name }}
    </p>
    <p>Categorie : {{ weapon.category.name }} - Calibre : {{ weapon.caliber.name }}</p>
    <p>
      Canon filté : {{ weapon.isThreadedBarrel ? 'Oui' : 'Non' }}
      {{ weapon.isThreadedBarrel ? `- filetage en ${weapon.threadedSize.size}` : '' }}
    </p>
    <p>
      Detente reglable : {{ weapon.isAdjustableTrigger ? 'Oui' : 'Non' }}
      {{ weapon.isAdjustableTrigger ? `Reglage de ${weapon.adjustableTriggerValue}` : '' }}
    </p>
    <p>Type de percussion : {{ weapon.percussionType.name }}</p>
    <p>Description : {{ weapon.description }}</p>
    <p>Chargeur fournis : {{ weapon.providedMagazineQuantity }}</p>

    <p>Reference produit : {{ weapon.reference }}</p>
  </div>
</template>
<script setup lang="ts">
import type { WeaponDto } from '@/api/Api'
const { weapon } = defineProps<{
  weapon: WeaponDto
}>()
</script>

<style scoped></style>
