<template>
  <div class="w-4/12">
    <InputGroup>
      <input-group-required-icon :is-validate="categoryId > 0" />
      <input-group-select
        :options="categories$"
        label="legalisationCategory"
        @option-id="(event) => (categoryId = event)"
        required
        input-id="categoryId"
      />
    </InputGroup>
    <div class="flex justify-center mt-6">
      <Button
        type="button"
        :label="t('global.continue')"
        :disabled="categoryId === 0"
        @click="onSelectCategory"
      ></Button>
    </div>
  </div>
</template>
<script setup lang="ts">
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroupSelect from '@/components/__form/InputGroupSelect.vue'
import InputGroup from 'primevue/inputgroup'
import { useLegalisationCategoryStore } from '@/stores/legalisation-category.store'
import { ref } from 'vue'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const weaponCategoryStore = useLegalisationCategoryStore()
const { data: categories$ } = weaponCategoryStore.getAll()
const emit = defineEmits(['selectCategory'])
const categoryId = ref<number>(0)
const onSelectCategory = () => {
  emit('selectCategory', categoryId.value)
}
</script>

<style scoped></style>
