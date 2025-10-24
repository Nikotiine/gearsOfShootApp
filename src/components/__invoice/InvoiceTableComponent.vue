<template>
  <div class="card p-4">
    <table-title-component :i18n-prefix="i18nPrefix" />
    <div class="text-red-500 text-center" v-if="isError">{{ t('global.isLoadingError') }}</div>
    <DataTable
      v-model:filters="filters"
      :value="invoices"
      paginator
      :rows="10"
      dataKey="id"
      filterDisplay="menu"
      :loading="isLoading"
      :globalFilterFields="[
        'supplier.name',
        'dueDate',
        'totalPriceHt',
        'totalInvoiceItems',
        'createdBy.lastName'
      ]"
    >
      <template #header>
        <div class="flex justify-center">
          <IconField>
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText v-model="filters['global'].value" :placeholder="t('global.globalSearch')" />
          </IconField>
        </div>
      </template>
      <template #empty> {{ t(i18nPrefix + 'notFound') }} </template>
      <template #loading> {{ t(i18nPrefix + 'loading') }} {{ t('global.pleaseWait') }} </template>
      <Column field="supplier.name" :header="t('global.model')" style="min-width: 12rem">
        <template #body="{ data }">
          {{ data.supplier.name }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <Select
            v-model="filterModel.value"
            @change="filterCallback()"
            :options="suppliers$"
            optionLabel="name"
            optionValue="name"
            :placeholder="t('global.findBySupplier')"
            style="min-width: 12rem"
            :showClear="true"
          >
          </Select>
        </template>
      </Column>
      <Column
        :header="t('invoice.dueDate')"
        filterField="dueDate"
        style="min-width: 12rem"
        dataType="date"
      >
        <template #body="{ data }">
          {{ DateFormatter(data.dueDate, 'long') }}
        </template>

        <template #filter="{ filterModel, filterCallback }">
          <DatePicker v-model="filterModel.value" dateFormat="mm/dd/yy" @input="filterCallback()" />
        </template>
      </Column>
      <Column
        :header="t('invoice.totalPriceHt')"
        field="totalPriceHt"
        filterField="totalPriceHt"
        style="min-width: 14rem"
      >
        <template #body="{ data }">
          {{ data.totalPriceHt }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            placeholder="Recherche par reference"
          />
        </template>
      </Column>
      <Column
        field="totalInvoiceItems"
        filterField="totalInvoiceItems"
        :header="t('invoice.totalInvoiceItems')"
        style="min-width: 12rem"
      >
        <template #body="{ data }">
          {{ data.totalInvoiceItems }}
        </template>

        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            placeholder="Recherche par reference"
          />
        </template>
      </Column>
      <Column
        field="createdBy.lastName"
        filterField="createdBy.lastName"
        :header="t('global.createdBy')"
        style=""
      >
        <template #body="{ data }">
          {{ data.createdBy.lastName }}
        </template>

        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            placeholder="Recherche par reference"
          />
        </template>
      </Column>
      <Column :header="t('global.action')" :showFilterMenu="false" style="min-width: 12rem">
        <template #body="{ data }">
          <div class="flex justify-around">
            <action-menu-component
              @on-click-action="onClickAction"
              type="ammunition"
              :reference="data.internalInvoiceReference"
              :id="data.id"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import { useInvoiceStore } from '@/stores/invoice.store'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import InputIcon from 'primevue/inputicon'
import Select from 'primevue/select'
import TableTitleComponent from '@/components/__table/TableTitleComponent.vue'
import IconField from 'primevue/iconfield'
import ActionMenuComponent, {
  type ActionMenuEmit
} from '@/components/__table/ActionMenuComponent.vue'
import { ref } from 'vue'
import { FilterMatchMode, FilterOperator } from '@primevue/core/api'
import { useI18n } from 'vue-i18n'
import { useSupplierStore } from '@/stores/supplier.store'
import DatePicker from 'primevue/datepicker'
import { RouterEnum } from '@/enum/router.enum'
import { useRouter } from 'vue-router'
import { DateFormatter } from '@/shared/utils/formatter.utils'

const store = useInvoiceStore()
const supplierStore = useSupplierStore()
const { t } = useI18n()
const router = useRouter()
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  'supplier.name': { value: null, matchMode: FilterMatchMode.EQUALS },
  dueDate: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }]
  },
  totalPriceHt: { value: null, matchMode: FilterMatchMode.EQUALS },
  totalInvoiceItems: { value: null, matchMode: FilterMatchMode.EQUALS },
  'createdBy.lastName': { value: null, matchMode: FilterMatchMode.CONTAINS }
})
const i18nPrefix = store.getI18NPrefix
const { data: invoices, refetch, isError, isLoading } = store.getAll()
const { data: suppliers$ } = supplierStore.getAll()
const onClickAction = (event: ActionMenuEmit | boolean, id: number) => {
  switch (event) {
    case 'view':
      router.push({ name: RouterEnum.INVOICE_DETAIL, params: { id: id } })
      break
    case 'edit':
      router.push({ name: RouterEnum.AMMUNITION_EDIT, params: { id: id } })
      break
    case true:
      // store.delete(id)
      refetch()
      break
  }
}
</script>

<style scoped></style>
