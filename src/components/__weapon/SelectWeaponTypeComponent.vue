<template>
  <div class="mt-4">
    <div
      class="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 pt-4"
      v-if="store.prerequisitesWeaponList.isSuccess"
    >
      <InputGroup>
        <InputGroupAddon>
          <i :class="isOnContinue ? 'pi pi-check text-green-400' : 'pi pi-sort'"></i>
        </InputGroupAddon>
        <IftaLabel>
          <Select
            v-model="typeId"
            :options="store.prerequisitesWeaponList.data?.data.types"
            optionLabel="name"
            :placeholder="t('global.select')"
            optionValue="id"
            id="typeId"
            :disabled="isOnContinue"
          />
          <label for="typeId" v-capitalize="t('global.weaponType')"></label>
        </IftaLabel>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <i :class="isOnContinue ? 'pi pi-check text-green-400' : 'pi pi-sort'"></i>
        </InputGroupAddon>
        <IftaLabel>
          <Select
            v-model="categoryId"
            :options="store.prerequisitesWeaponList.data?.data.categories"
            :placeholder="t('global.select')"
            id="categoryId"
            optionValue="id"
            optionLabel="name"
            :disabled="isOnContinue"
          />
          <label for="categoryId" v-capitalize="t('global.category')"></label>
        </IftaLabel>
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
import IftaLabel from 'primevue/iftalabel'
import Select from 'primevue/select'
import InputGroupAddon from 'primevue/inputgroupaddon'
import { computed, ref } from 'vue'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import { useWeaponStore } from '@/stores/weapon'
const store = useWeaponStore()
const { t } = useI18n()
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
