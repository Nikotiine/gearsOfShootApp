<template>
  <div class="mt-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 pt-4">
      <weapon-type-input-select
        required
        can-add-new
        @on-select="(event) => (options.type = event)"
        :initial-value="options.type.id"
      />
      <legalisation-category-input-select
        required
        :disabled="isOnContinue"
        @on-select="(event) => (options.category = event)"
        :initial-value="options.category.id"
      />
    </div>
    <div class="flex justify-center mt-6" v-if="!isOnContinue">
      <Button
        type="button"
        :label="t('global.continue')"
        :disabled="!canContinue"
        @click="onContinue"
      ></Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import LegalisationCategoryInputSelect from '@/components/__form/__specific_select/LegalisationCategoryInputSelect.vue'
import WeaponTypeInputSelect from '@/components/__form/__specific_select/WeaponTypeInputSelect.vue'

import type { NewWeapon } from '@/stores/weapon'

const { t } = useI18n()
const { selectedOptions } = defineProps<{
  selectedOptions: NewWeapon
}>()
const emit = defineEmits(['nextStep'])
const isOnContinue = ref<boolean>(false)
const options = ref<NewWeapon>({ ...selectedOptions })
const onContinue = () => {
  emit('nextStep', {
    type: options.value.type,
    category: options.value.category
  })
  isOnContinue.value = !isOnContinue.value
}
const canContinue = computed(() => {
  let isContinue: boolean = false
  if (options.value.category.id > 0 && options.value.type.id > 0) {
    isContinue = true
  }
  return isContinue
})
watch(
  () => selectedOptions,
  (value) => {
    options.value = value
  }
)
</script>

<style scoped></style>
