<template>
  <div class="mt-4">
    <div
      class="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 pt-4"
      v-if="store.prerequisitesWeaponList.isSuccess"
    >
      <InputGroup>
        <input-group-required-icon :is-validate="isOnContinue" />
        <input-group-select
          :options="store.prerequisitesWeaponList.data?.data.types"
          type="weaponType"
          @option-id="(event) => (typeId = event)"
          required
          :disabled="isOnContinue"
          filter
        />
        <input-group-addon-open-drawer-button
          type="weaponType"
          :open-drawer="openDrawer"
          v-if="!isOnContinue"
        />
      </InputGroup>
      <InputGroup>
        <input-group-required-icon :is-validate="isOnContinue" />
        <input-group-select
          :options="store.prerequisitesWeaponList.data?.data.categories"
          type="legalisationCategory"
          @option-id="(event) => (categoryId = event)"
          required
          :disabled="isOnContinue"
        />
      </InputGroup>
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
import InputGroup from 'primevue/inputgroup'
import { computed, ref } from 'vue'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import { useWeaponStore } from '@/stores/weapon'
import InputGroupAddonOpenDrawerButton from '@/components/__form/InputGroupAddonOpenDrawerButton.vue'
import InputGroupSelect from '@/components/__form/InputGroupSelect.vue'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
const store = useWeaponStore()
const { t } = useI18n()
const { openDrawer } = defineProps<{
  openDrawer: Function
}>()
const nextStep = defineEmits(['nextStep'])
const typeId = ref<number>(0)
const categoryId = ref<number>(0)
const isOnContinue = ref<boolean>(false)
const onContinue = () => {
  nextStep('nextStep', {
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
</script>

<style scoped></style>
