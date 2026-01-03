<template>
  <div class="card p-4">
    <table-title-component :i18n-prefix="i18nPrefix" />
    <div class="text-red-500 text-center" v-if="isError">{{ t('global.isLoadingError') }}</div>
    <DataTable
      v-model:filters="filters"
      :value="optics$?.data"
      paginator
      :rows="queryFilter$.limit"
      :total-records="optics$?.total"
      :rowsPerPageOptions="[10, 20, 50]"
      dataKey="id"
      lazy
      @filter="onFilterChange"
      @page="onPageChange"
      filterDisplay="row"
      :loading="isLoading"
      :globalFilterFields="['name', 'factory', 'type', 'reference']"
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
        :header="t(i18nPrefix + 'opticType')"
        field="type.name"
        filterField="type"
        :showFilterMenu="false"
        style="min-width: 14rem"
      >
        <template #body="{ data }">
          {{ data.opticType.name }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <Select
            v-model="filterModel.value"
            @change="filterCallback()"
            :options="opticTypes$"
            :placeholder="t(i18nPrefix + 'findByType')"
            optionLabel="name"
            optionValue="name"
            style="min-width: 12rem"
            :showClear="true"
          >
          </Select>
        </template>
      </Column>
      <!--      <Column
        header="Plan focal"
        filterField="focalPlane.name"
        :showFilterMenu="false"
        style="min-width: 14rem"
      >
        <template #body="{ data }">
          {{ data.focalPlane.name }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <Select
            v-model="filterModel.value"
            @change="filterCallback()"
            :options="focalPlanes$"
            placeholder="Plan focal"
            optionLabel="name"
            optionValue="name"
            style="min-width: 12rem"
            :showClear="true"
          >
          </Select>
        </template>
      </Column>-->
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
            type="optic"
            :reference="data.reference"
            :id="data.id"
        /></template>
      </Column>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import { useOpticStore } from '@/stores/optic.store'
import IconField from 'primevue/iconfield'
import DataTable, { type DataTableFilterEvent, type DataTablePageEvent } from 'primevue/datatable'
import InputText from 'primevue/inputtext'
import Column from 'primevue/column'
import InputIcon from 'primevue/inputicon'
import Select from 'primevue/select'
import { useI18n } from 'vue-i18n'
import { FilterMatchMode } from '@primevue/core/api'
import { ref } from 'vue'
import { useFactoryStore } from '@/stores/factory.store'
import ActionMenuComponent, {
  type ActionMenuEmit
} from '@/components/__table/ActionMenuComponent.vue'
import { AdminRouterEnum } from '@/enum/router/admin-router.enum'
import { useRouter } from 'vue-router'
import { useOpticTypeStore } from '@/stores/optic-type.store'
import { storeToRefs } from 'pinia'
import TableTitleComponent from '@/components/__table/TableTitleComponent.vue'

const { t } = useI18n()
const router = useRouter()
const store = useOpticStore()
const { queryFilter$ } = storeToRefs(store)
const factoryStore = useFactoryStore()
const opticTypeStore = useOpticTypeStore()
factoryStore.getFactoriesByType('optic')
const i18nPrefix = store.getI18NPrefix
opticTypeStore.getAll()
const { data: optics$, isError, isLoading, refetch } = store.getAll()
const { factories$ } = storeToRefs(factoryStore)
const { opticTypes$ } = storeToRefs(opticTypeStore)

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  factory: { value: null, matchMode: FilterMatchMode.EQUALS },
  type: { value: null, matchMode: FilterMatchMode.EQUALS },
  // 'focalPlane.name': { value: null, matchMode: FilterMatchMode.EQUALS },
  reference: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
})
const onFilterChange = (event: DataTableFilterEvent) => {
  const activeFilters = Object.fromEntries(
    Object.entries(event.filters).map(([key, meta]: any) => [key, meta.value])
  )
  queryFilter$.value.factory = activeFilters.factory
  queryFilter$.value.type = activeFilters.type
  queryFilter$.value.name = activeFilters.name
  queryFilter$.value.reference = activeFilters.reference
}
const onPageChange = (event: DataTablePageEvent) => {
  queryFilter$.value.offset = event.first
  queryFilter$.value.limit = event.rows
}
const onClickAction = (event: ActionMenuEmit | boolean, id: number) => {
  switch (event) {
    case 'view':
      router.push({ name: AdminRouterEnum.OPTIC_DETAIL, params: { id: id } })
      break
    case 'edit':
      router.push({ name: AdminRouterEnum.OPTIC_EDIT, params: { id: id } })
      break
    case true:
      store.delete(id)
      refetch()
      break
  }
}
</script>

<style scoped></style>
