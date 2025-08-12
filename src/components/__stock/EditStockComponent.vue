<template>
  <h2 class="text-xl text-center text-blue-500 mt-2">{{ t(i18nPrefix + 'summary') }}</h2>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 p-4" v-if="formStatus === 'save'">
    <input-group-number
      :i18n-prefix="i18nPrefix"
      placeholder="stock"
      label="stock"
      @value="(value) => updateInitialStock(value)"
      input-id="stock"
      :initial-value="inStock"
      add-on="pcs"
    />
  </div>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 p-4" v-else>
    <p>
      {{ t('stock.quantity') }}
      <span :class="textColor(currentStock)">{{ NumberFormatter(currentStock, 'pcs') }}</span>
    </p>
    <p>
      {{ t('stock.onOrder') }}
      <span>On mettra en commande pour la gestion du stock</span>
    </p>
    <div class="flex flex-col">
      <Button
        type="button"
        :label="t('stock.edit')"
        class="mx-auto p-0"
        text
        @click="showDrawer('stock')"
        severity="danger"
      ></Button>
      <Button
        type="button"
        :label="t('stock.showHistory')"
        class="mx-auto p-0"
        text
        @click="showDrawer('stockHistory')"
        severity="info"
      ></Button>
    </div>
  </div>
  <drawer-view v-model:visible="visible" :component="drawerTypeComponent" />
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { NumberFormatter } from '@/shared/utils/formatter.utils'
import InputGroupNumber from '@/components/__form/InputGroupNumber.vue'
import type { FormStatus } from '@/types/form-status.type'
import Button from 'primevue/button'
import { ref } from 'vue'
import DrawerView, { type DrawerViewFormComponent } from '@/views/shared/DrawerView.vue'
import { useFormStore } from '@/stores/form.store'
import type { StockableObjectType } from '@/types/priceable-object.type'
import { useStockStore } from '@/stores/stock.store'
import { storeToRefs } from 'pinia'

const { t } = useI18n()
const store = useStockStore()
const formStore = useFormStore()
const formStatus: FormStatus = formStore.getFormStatus()
const emit = defineEmits(['update:inStock'])
const i18nPrefix = 'stock.'
const { inStock, objectId, object } = defineProps<{
  inStock: number
  objectId?: string
  object: StockableObjectType
}>()
store.setCurrentStock(inStock)
function updateInitialStock(value: number) {
  emit('update:inStock', value)
}
const drawerTypeComponent = ref<DrawerViewFormComponent>('stock')
const { data } = store.getByObjectAndObjectId(object, objectId)
console.log(data)
const { currentStock } = storeToRefs(store)
const visible = ref(false)
function showDrawer(item: DrawerViewFormComponent): void {
  drawerTypeComponent.value = item
  visible.value = true
  store.setObject(object)
  store.setObjectId(objectId)
}

function textColor(quantity: number): string {
  if (quantity > 20) {
    return 'text-blue-500'
  } else if (quantity > 10 && quantity < 21) {
    return 'text-green-600'
  } else if (quantity > 2 && quantity < 11) {
    return 'text-orange-600'
  } else {
    return 'text-red-500'
  }
}
</script>

<style scoped></style>
