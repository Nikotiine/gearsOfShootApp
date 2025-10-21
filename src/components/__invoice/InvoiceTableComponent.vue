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
      filterDisplay="row"
      :loading="storeAreLoading.value"
      :globalFilterFields="['name', 'factory.name', 'caliber.name', 'reference']"
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
      <Column
        field="name"
        :header="t('global.model')"
        style="min-width: 12rem"
        :showFilterMenu="false"
      >
        <template #body="{ data }">
          {{ data.name }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            :placeholder="t(i18nPrefix + 'findByName')"
          />
        </template>
      </Column>
      <Column
        :header="t('global.factory')"
        field="factory.name"
        filterField="factory.name"
        style="min-width: 12rem"
        :showFilterMenu="false"
      >
        <template #body="{ data }">
          {{ data.factory.name }}
        </template>

        <template #filter="{ filterModel, filterCallback }">
          <Select
            v-model="filterModel.value"
            @change="filterCallback()"
            :options="factories$"
            optionLabel="name"
            optionValue="name"
            :placeholder="t('global.findByFactory')"
            style="min-width: 12rem"
            :showClear="true"
          >
          </Select>
        </template>
      </Column>
      <Column
        :header="t('global.caliber')"
        filterField="caliber.name"
        :showFilterMenu="false"
        style="min-width: 14rem"
      >
        <template #body="{ data }">
          {{ data.caliber.name }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <Select
            v-model="filterModel.value"
            @change="filterCallback()"
            :options="calibers$"
            placeholder="Calibre"
            optionLabel="name"
            optionValue="name"
            style="min-width: 12rem"
            :showClear="true"
          >
          </Select>
        </template>
      </Column>
      <Column
        field="reference"
        :header="t('global.reference')"
        :showFilterMenu="false"
        style="min-width: 12rem"
      >
        <template #body="{ data }">
          {{ data.reference }}
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
        field="inStock"
        filterField="inStock"
        :header="t('global.inStock')"
        :showFilterMenu="false"
        style=""
      >
        <template #body="{ data }">
          {{ data.inStock }}
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
              :reference="data.reference"
              :id="data.id"
            />
            <InvoiceAddItemComponent
              object="AMMUNITION"
              :object-id="data.id"
              :description="`Marque:${data.factory.name} Model:${data.name} Calibre:${data.caliber.name} Packaging:${data.packaging}`"
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
import InvoiceAddItemComponent from '@/components/__invoice/InvoiceAddItemComponent.vue'
import InputIcon from 'primevue/inputicon'
import Select from 'primevue/select'
import TableTitleComponent from '@/components/__table/TableTitleComponent.vue'
import IconField from 'primevue/iconfield'
import ActionMenuComponent from '@/components/__table/ActionMenuComponent.vue'
import { ref } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'
import { useI18n } from 'vue-i18n'
const store = useInvoiceStore()
const { t } = useI18n()
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  'factory.name': { value: null, matchMode: FilterMatchMode.EQUALS },
  'caliber.name': { value: null, matchMode: FilterMatchMode.EQUALS },
  inStock: { value: null, matchMode: FilterMatchMode.EQUALS },
  reference: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
})
const i18nPrefix = store.getI18NPrefix
const { data: invoices, refetch, isError } = store.getAll()
</script>

<style scoped></style>
