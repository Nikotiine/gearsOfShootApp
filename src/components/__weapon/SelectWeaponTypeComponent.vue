<template>
  <div class="mt-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 pt-4">
      <weapon-type-input-select
        required
        can-add-new
        @on-select="(event) => (typeId = event)"
        :initial-value="typeId"
      />
      <legalisation-category-input-select
        :initial-value="categoryId"
        required
        :disabled="isOnContinue"
        @on-select="(event) => (categoryId = event)"
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

const { t } = useI18n()
const { reset } = defineProps<{
  reset: boolean
}>()
const emit = defineEmits(['nextStep'])
const typeId = ref<number>(0)
const categoryId = ref<number>(0)
const isOnContinue = ref<boolean>(false)
const onContinue = () => {
  emit('nextStep', {
    type: typeId.value,
    category: categoryId.value
  })
  isOnContinue.value = !isOnContinue.value
}
const canContinue = computed(() => {
  let isContinue: boolean = false
  if (categoryId.value > 0 && typeId.value > 0) {
    isContinue = true
  }
  return isContinue
})

watch(
  () => reset,
  (value) => {
    if (value) {
      isOnContinue.value = false
      typeId.value = 0
      categoryId.value = 0
    }
  }
)
</script>

<style scoped></style>
