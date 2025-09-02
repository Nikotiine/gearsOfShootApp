<template>
  <h2 class="text-xl text-center text-blue-500 mt-2">{{ t(i18nPrefix + 'summary') }}</h2>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 p-4" v-if="formStatus === 'save'">
    <input-group-number
      :i18n-prefix="i18nPrefix"
      placeholder="quantity"
      label="quantity"
      @value="(value) => updateInitialStock(value)"
      input-id="stock"
      :initial-value="inStock"
      add-on="pcs"
    />
  </div>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 p-4" v-else>
    <p>
      {{ t('stock.quantity') }}
      <span :class="GetClassTextColorByQuantity(currentStock)">{{
        NumberFormatter(currentStock, 'pcs')
      }}</span>
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
        @click="showDrawer('stockHistory', 'top')"
        severity="info"
      ></Button>
    </div>
  </div>
  <drawer-view
    v-model:visible="visible"
    :component="drawerTypeComponent"
    :position="drawerPosition"
  />
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { NumberFormatter } from '@/shared/utils/formatter.utils'
import InputGroupNumber from '@/components/__form/InputGroupNumber.vue'
import type { FormStatus } from '@/types/form-status.type'
import Button from 'primevue/button'
import { ref } from 'vue'
import DrawerView, {
  type DrawerPosition,
  type DrawerViewFormComponent
} from '@/views/shared/DrawerView.vue'
import { useFormStore } from '@/stores/form.store'
import type { StockableObjectType } from '@/types/priceable-object.type'
import { useStockStore } from '@/stores/stock.store'
import { storeToRefs } from 'pinia'
import { GetClassTextColorByQuantity } from '@/shared/utils/colors.utils'

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
store.getByObjectAndObjectId(object, objectId)
const { currentStock } = storeToRefs(store)
const visible = ref(false)
const drawerPosition = ref<DrawerPosition>('right')
function showDrawer(item: DrawerViewFormComponent, position: DrawerPosition = 'right'): void {
  drawerTypeComponent.value = item
  visible.value = true
  drawerPosition.value = position
  store.setObject(object)
  store.setObjectId(objectId)
}
</script>

<style scoped></style>
