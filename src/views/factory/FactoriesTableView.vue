<template>
  <div class="card">
    <table-title-component :i18n-prefix="i18nPrefix" />
    <div class="mt-2" v-if="isSuccess">
      <DataTable
        v-model:filters="filters"
        :value="data?.data"
        paginator
        :rows="queryFilters$.limit"
        :total-records="data?.total"
        :rowsPerPageOptions="[10, 20, 50]"
        dataKey="id"
        lazy
        filterDisplay="row"
        @filter="onFilterChange"
        @page="onPageChange"
        :loading="isLoading"
        :globalFilterFields="['name', 'type', 'reference']"
      >
        <template #header>
          <div class="flex justify-center">
            <IconField>
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText v-model="filters['global'].value" placeholder="Recherche globale" />
            </IconField>
          </div>
        </template>
        <template #empty> {{ t(i18nPrefix + 'notFound') }} </template>
        <template #loading> {{ t(i18nPrefix + 'loading') }} {{ t('global.pleaseWait') }} </template>
        <Column field="name" header="Nom" style="min-width: 12rem" :showFilterMenu="false">
          <template #body="{ data }">
            {{ data.name }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              placeholder="Recherche par nom"
            />
          </template>
        </Column>
        <Column
          :header="t(i18nPrefix + 'type')"
          field="type.name"
          filterField="type"
          style="min-width: 12rem"
          :showFilterMenu="false"
        >
          <template #body="{ data }">
            {{ t('factory.types.' + data.type.name) }}
          </template>

          <template #filter="{ filterModel, filterCallback }">
            <Select
              v-model="filterModel.value"
              @change="filterCallback()"
              :options="types$"
              optionLabel="label"
              optionValue="name"
              placeholder="Marque de "
              style="min-width: 12rem"
              :showClear="true"
            >
            </Select>
          </template>
        </Column>
        <Column
          :header="t('global.reference')"
          filterField="reference"
          :showFilterMenu="false"
          style="min-width: 14rem"
        >
          <template #body="{ data }">
            {{ data.reference }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              placeholder="Recherche par ref"
            />
          </template>
        </Column>
        <Column header="Actions" :showFilterMenu="false" style="min-width: 12rem">
          <template #body="{ data }">
            <action-menu-component
              @on-click-action="onClickAction"
              type="magazine"
              :reference="data.reference"
              :id="data.id"
          /></template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
<script setup lang="ts">
import DataTable, { type DataTableFilterEvent, type DataTablePageEvent } from 'primevue/datatable'
import Column from 'primevue/column'
import { useFactoryStore } from '@/stores/factory.store'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import Select from 'primevue/select'
import InputIcon from 'primevue/inputicon'
import { FilterMatchMode } from '@primevue/core/api'
import { computed, ref } from 'vue'
import ActionMenuComponent, { type ActionMenuEmit } from '@/components/__table/ActionMenuComponent.vue'
import { RouterEnum } from '@/enum/router.enum'
import { useRouter } from 'vue-router'
import TableTitleComponent from '@/components/__table/TableTitleComponent.vue'
import { FactoryTypeFormatter } from '@/shared/utils/formatter.utils'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'

const props = defineProps<{
  type?: string
}>()
const { t } = useI18n()
const store = useFactoryStore()
const { queryFilters$ } = storeToRefs(store)
const i18nPrefix = store.getI18NPrefix
const { isSuccess, isLoading, data, refetch } = store.getAll()
const { data: factoriesTypes } = store.getFactoryTypes()
const types$ = computed(() => {
  return FactoryTypeFormatter(factoriesTypes.value)
})
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  type: { value: null, matchMode: FilterMatchMode.EQUALS },
  reference: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
})
const router = useRouter()
const onClickAction = (event: ActionMenuEmit | boolean, id: number) => {
  switch (event) {
    //TODO : Faire la view
    case 'view':
      router.push({ name: RouterEnum.AMMUNITION_DETAIL, params: { id: id } })
      break
    case 'edit':
      router.push({ name: RouterEnum.FACTORY_EDIT, params: { id: id } })
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
  queryFilters$.value.type = activeFilters.type
  queryFilters$.value.name = activeFilters.name
  queryFilters$.value.reference = activeFilters.reference
}
const onPageChange = (event: DataTablePageEvent) => {
  queryFilters$.value.offset = event.first
  queryFilters$.value.limit = event.rows
}
</script>

<style scoped></style>
