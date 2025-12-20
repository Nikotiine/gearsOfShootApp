<template>
  <div class="card p-4" v-if="isSuccess">
    <table-title-component :i18n-prefix="i18nPrefix" />
    <div class="text-red-500 text-center" v-if="isError">{{ t('global.isLoadingError') }}</div>
    <DataTable
      v-model:filters="filters"
      :value="data?.data"
      paginator
      :rows="queryFilters$.limit"
      :total-records="data?.total"
      :rowsPerPageOptions="[10, 20, 50]"
      dataKey="id"
      filterDisplay="row"
      currentPageReportTemplate="{first} to {last} of {totalRecords}"
      lazy
      :loading="isLoading"
      @filter="onFilterChange"
      @page="onPageChange"
      :globalFilterFields="['name', 'factory', 'railSize', 'reference']"
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
      <template #loading>
        {{ t(i18nPrefix + 'loading') }} {{ t(i18nPrefix + 'pleaseWait') }}
      </template>
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
        filterField="factory"
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
        :header="t(i18nPrefix + 'rail')"
        filterField="railSize"
        field="railSize.name"
        :showFilterMenu="false"
        style="min-width: 14rem"
      >
        <template #body="{ data }">
          {{ data.railSize.name }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <Select
            v-model="filterModel.value"
            @change="filterCallback()"
            :options="railSize$?.data"
            :placeholder="t(i18nPrefix + 'findByRail')"
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
            :placeholder="t('global.findByReference')"
          />
        </template>
      </Column>
      <Column :header="t('global.action')" :showFilterMenu="false" style="min-width: 12rem">
        <template #body="{ data }">
          <action-menu-component
            @on-click-action="onClickAction"
            type="collar"
            :reference="data.reference"
            :id="data.id"
        /></template>
      </Column>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import { useOpticCollarStore } from '@/stores/optic-collar.store'
import ActionMenuComponent, {
  type ActionMenuEmit
} from '@/components/__table/ActionMenuComponent.vue'
import IconField from 'primevue/iconfield'
import DataTable, { type DataTableFilterEvent, type DataTablePageEvent } from 'primevue/datatable'
import InputText from 'primevue/inputtext'
import Column from 'primevue/column'
import InputIcon from 'primevue/inputicon'
import Select from 'primevue/select'
import { useI18n } from 'vue-i18n'
import { useFactoryStore } from '@/stores/factory.store'
import { useRailSizeStore } from '@/stores/rail-size.store'
import { ref } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'
import { RouterEnum } from '@/enum/router.enum'
import { useRouter } from 'vue-router'
import TableTitleComponent from '@/components/__table/TableTitleComponent.vue'
import { storeToRefs } from 'pinia'

const store = useOpticCollarStore()
const { queryFilters$ } = storeToRefs(store)
const i18nPrefix = store.getI18NPrefix
const { data, isSuccess, isError, isLoading, refetch } = store.getAll()
const { t } = useI18n()
const factoryStore = useFactoryStore()
const railSizeStore = useRailSizeStore()
const router = useRouter()
const { data: factories$ } = factoryStore.getFactoriesByType('accessory')
const { data: railSize$ } = railSizeStore.getAll()
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  factory: { value: null, matchMode: FilterMatchMode.EQUALS },
  railSize: { value: null, matchMode: FilterMatchMode.EQUALS },
  reference: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
})
const onClickAction = (event: ActionMenuEmit | boolean, id: number) => {
  switch (event) {
    case 'view':
      router.push({ name: RouterEnum.OPTIC_COLLAR_DETAIL, params: { id: id } })
      break
    case 'edit':
      router.push({ name: RouterEnum.OPTIC_COLLAR_EDIT, params: { id: id } })
      break
    case true:
      store.delete(id)
      refetch()
      break
  }
}
const onFilterChange = (event: DataTableFilterEvent) => {
  const activeFilters = Object.fromEntries(
    Object.entries(event.filters).map(([key, meta]: any) => [key, meta.value])
  )
  queryFilters$.value.factory = activeFilters.factory
  queryFilters$.value.railSize = activeFilters.railSize
  queryFilters$.value.name = activeFilters.name
  queryFilters$.value.reference = activeFilters.reference
}
const onPageChange = (event: DataTablePageEvent) => {
  queryFilters$.value.offset = event.first
  queryFilters$.value.limit = event.rows
}
</script>

<style scoped></style>
