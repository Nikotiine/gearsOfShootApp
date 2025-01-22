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
import { type NewWeapon, useWeaponStore } from '@/stores/weapon'
import { storeToRefs } from 'pinia'
import Button from 'primevue/button'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const store = useWeaponStore()
const { t } = useI18n()
const { weaponTypes$, categories$ } = storeToRefs(store)
const { initialState, selectedOptions } = defineProps<{
  initialState: boolean
  selectedOptions: NewWeapon
  changeOptions: Function
}>()

const title = computed(() => {
  const category = categories$.value.find((cat) => cat.id === selectedOptions.category)
  const type = weaponTypes$.value.find((type) => type.id === selectedOptions.type)
  return `${type?.name} de ${t('global.category')} ${category?.name}`
})
</script>

<style scoped></style>
