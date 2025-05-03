<template>
  <h2 class="text-center mt-16 text-xl lg:text-2xl text-blue-500">
    {{ initialState ? t('weapon.form.yourChoose') + title : t('weapon.form.selectType') }}
  </h2>
  <h3 v-if="initialState" class="text-center text-green-500 mt-4">
    <Button
      label="Changer les options"
      severity="secondary"
      variant="text"
      @click="changeOptions()"
    />
  </h3>
</template>
<script setup lang="ts">
import { type NewWeapon } from '@/stores/weapon'
import Button from 'primevue/button'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const { initialState, selectedOptions } = defineProps<{
  initialState: boolean
  selectedOptions: NewWeapon
  changeOptions: Function
}>()

const title = computed(() => {
  return `${selectedOptions.type.name} de ${t('global.category')} ${selectedOptions.category.name}`
})
</script>

<style scoped></style>
