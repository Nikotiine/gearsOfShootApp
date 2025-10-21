<template>
  <form-title-component :i18n-prefix="i18nPrefix" custom-status="save" />
  <form @submit.prevent="submit">
    <div class="p-4">
      <DataTable :value="form.items" stripedRows showGridlines>
        <Column field="object" header="Type" style="max-width: 4rem">
          <template #body="slotProps"> {{ t('orderStatus.' + slotProps.data.object) }} </template>
        </Column>
        <Column field="supplierPriceHT" header="Prix HT" style="max-width: 5rem">
          <template #body="slotProps"> {{ slotProps.data.supplierPriceHT }}€ </template>
        </Column>
        <Column field="status" header="Statut" style="max-width: 4rem">
          <template #body="slotProps"> {{ t('orderStatus.' + slotProps.data.status) }} </template>
        </Column>
        <Column field="comment" header="Comment" style="max-width: 12rem">
          <template #body="slotProps">
            <p>{{ slotProps.data.comment }}</p>
          </template>
        </Column>
        <Column field="quantity" header="Quantity" style="max-width: 5rem">
          <template #body="slotProps">
            <InputNumber
              v-model="slotProps.data.quantity"
              inputId="quantity"
              mode="decimal"
              showButtons
              :min="0"
            />
          </template>
        </Column>
        <Column field="accountHT" header="Accompte" style="max-width: 5rem">
          <template #body="slotProps">
            <InputNumber
              v-model="slotProps.data.accountHT"
              inputId="accountHT"
              mode="decimal"
              :min="0"
              :max="slotProps.data.supplierPriceHT * slotProps.data.quantity"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 p-4">
      <supplier-select-input-select
        :initial-value="form.supplier.id"
        required
        @on-select="(value) => (form.supplier = value)"
      />
      <input-group-number
        label="shippingCost"
        placeholder="shippingCost"
        @value="(value) => (form.shippingCost = value)"
        input-id="shippingCost"
        :initial-value="form.shippingCost"
        add-on="euro"
        :i18n-prefix="i18nPrefix"
      />
      <input-group-number
        label="vat"
        placeholder="vat"
        @value="(value) => (form.vat = value)"
        input-id="shippingCost"
        :initial-value="form.vat"
        add-on="percent"
        :i18n-prefix="i18nPrefix"
      />
    </div>
    <div class="px-4">
      <Textarea
        v-model="form.comment"
        autoResize
        rows="5"
        cols="30"
        class="w-full"
        placeholder="Description"
      />
    </div>
    <div class="border border-gray-200 px-4 mt-6">
      <p>Nb d'article : {{ totalItems }}</p>
      <p>Prix a regler : {{ totalCostHt }}</p>
      <p>Accompte : {{ totalAccountHt }}</p>
      <p>Reste a regler : {{ totalCostHt - totalAccountHt }}</p>
    </div>
    <div class="px-4 max-w-md mx-auto mt-6">
      <DatePicker
        v-model="dueDate"
        showIcon
        fluid
        placeholder="Date de payement prevue"
        iconDisplay="input"
        dateFormat="dd/mm/yy"
        :minDate="new Date()"
      />
    </div>
    <div class="text-center">
      <save-button :disabled="!isFormValid" />
    </div>
  </form>
</template>
<script setup lang="ts">
import DatePicker from 'primevue/datepicker'
import InputNumber from 'primevue/inputnumber'
import { useInvoiceStore } from '@/stores/invoice.store'
import FormTitleComponent from '@/components/__form/FormTitleComponent.vue'
import Textarea from 'primevue/textarea'
import InputGroupNumber from '@/components/__form/InputGroupNumber.vue'
import SupplierSelectInputSelect from '@/components/__form/__specific_select/SupplierSelectInputSelect.vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useI18n } from 'vue-i18n'
import SaveButton from '@/components/__form/SaveButton.vue'
import { computed, ref, watch } from 'vue'
const { t } = useI18n()
const store = useInvoiceStore()
const i18nPrefix = store.getI18NPrefix
const { id } = defineProps<{
  id?: string
}>()
const { form, submit } = store.formBuilder(id)
const dueDate = ref()
const totalItems = computed(() => {
  return form.value.items.reduce((acc, item) => acc + item.quantity, 0)
})

const totalCostHt = computed(() => {
  return form.value.items.reduce((acc, item) => acc + item.supplierPriceHT * item.quantity, 0)
})

const totalAccountHt = computed(() => {
  return form.value.items.reduce((acc, item) => acc + item.accountHT, 0)
})

//***********************Validateur*************************
const isFormValid = computed(() => {
  return form.value.supplier.id > 0 && totalItems.value > 0
})

watch(
  () => dueDate.value,
  (value) => {
    form.value.dueDate = value.toISOString()
  }
)
</script>

<style scoped></style>
