<template>
  <div class="card p-4">
    <table-title-component :i18n-prefix="i18nPrefix" :category="category" />
    <div class="text-red-500 text-center" v-if="isError">Error</div>
    <DataTable
      v-model:filters="filters"
      :value="data?.data"
      paginator
      :rows="queryFilters$.limit"
      :total-records="data?.total"
      :rowsPerPageOptions="[10, 20, 50]"
      dataKey="id"
      lazy
      currentPageReportTemplate="{first} to {last} of {totalRecords}"
      filterDisplay="row"
      @filter="onFilterChange"
      @page="onPageChange"
      :loading="isLoading"
      :globalFilterFields="['reference', 'factory', 'caliber', 'capacity']"
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
      <template #empty> {{ t('magazine.notFound') }} </template>
      <template #loading> {{ t('ammunition.loading') }} {{ t('global.pleaseWait') }} </template>
      <Column field="reference" header="reference" style="min-width: 12rem" :showFilterMenu="false">
        <template #body="{ data }">
          {{ data.reference }}
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
        header="Marque"
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
            :options="magazineFactory$"
            optionLabel="name"
            optionValue="name"
            placeholder="Marque"
            style="min-width: 12rem"
            :showClear="true"
          >
          </Select>
        </template>
      </Column>
      <Column
        header="Calibre"
        filterField="caliber"
        field="caliber.name"
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
        field="capacity"
        header="Capacité"
        dataType="numeric"
        :showFilterMenu="false"
        style="min-width: 3rem"
      >
        <template #body="{ data }">
          {{ data.capacity }}
        </template>

        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            placeholder="Recherche par capacité"
          />
        </template>
      </Column>
      <Column header="Actions" :showFilterMenu="false" style="min-width: 2rem">
        <template #body="{ data }">
          <action-menu-component
            @on-click-action="onClickAction"
            type="magazine"
            :reference="data.reference"
            :id="data.id"
            v-if="$route.meta.admin"
          />
          <public-action-menu-component
            :id="data.id"
            @on-click-action="onPublicClickAction"
            v-else
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import { useWeaponMagazineStore } from '@/stores/weapon-magazine.store'
import { onBeforeMount, ref } from 'vue'
import IconField from 'primevue/iconfield'
import DataTable, { type DataTableFilterEvent, type DataTablePageEvent } from 'primevue/datatable'
import InputText from 'primevue/inputtext'
import Column from 'primevue/column'
import InputIcon from 'primevue/inputicon'
import Select from 'primevue/select'
import { FilterMatchMode } from '@primevue/core/api'
import { useFactoryStore } from '@/stores/factory.store'
import { useCaliberStore } from '@/stores/caliber.store'

import { AdminRouterEnum } from '@/enum/router/admin-router.enum'
import ActionMenuComponent, {
  type ActionMenuEmit
} from '@/components/__table/ActionMenuComponent.vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import TableTitleComponent from '@/components/__table/TableTitleComponent.vue'
import { storeToRefs } from 'pinia'
import PublicActionMenuComponent, {
  type PublicActionMenuCEmit
} from '@/components/__table/PublicActionMenuComponent.vue'
import { PublicRouterEnum } from '@/enum/router/public-router.enum'

const { category } = defineProps<{
  category: string
}>()
const router = useRouter()
const { t } = useI18n()
const factoryStore = useFactoryStore()
const { data: magazineFactory$ } = factoryStore.getFactoriesByType('magazine')
const caliberStore = useCaliberStore()
const { data: calibers$ } = caliberStore.getAll()
const store = useWeaponMagazineStore()
const { queryFilters$ } = storeToRefs(store)
const i18nPrefix = store.getI18NPrefix
const { data, isError, isLoading, refetch } = store.getAll()
onBeforeMount(() => {
  queryFilters$.value.category = category
})
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  reference: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  factory: { value: null, matchMode: FilterMatchMode.EQUALS },
  caliber: { value: null, matchMode: FilterMatchMode.EQUALS },
  capacity: { value: null, matchMode: FilterMatchMode.EQUALS }
})

const onClickAction = (event: ActionMenuEmit | boolean, id: number) => {
  switch (event) {
    case 'view':
      router.push({ name: AdminRouterEnum.MAGAZINE_DETAIL, params: { id: id, category: category } })
      break
    case 'edit':
      router.push({ name: AdminRouterEnum.MAGAZINE_EDIT, params: { id: id, category: category } })
      break
    case true:
      store.delete(id)
      refetch()
      break
  }
}
const onPublicClickAction = (event: PublicActionMenuCEmit, id: number) => {
  switch (event) {
    case 'view':
      router.push({
        name: PublicRouterEnum.PUBLIC_MAGAZINE_DETAIL,
        params: { id: id, category: category }
      })
      break
    case 'add':
      console.log('add')
  }
}
const onFilterChange = (event: DataTableFilterEvent) => {
  const activeFilters = Object.fromEntries(
    Object.entries(event.filters).map(([key, meta]: any) => [key, meta.value])
  )
  queryFilters$.value.factory = activeFilters.factory
  queryFilters$.value.caliber = activeFilters.caliber
  queryFilters$.value.name = activeFilters.name
  queryFilters$.value.reference = activeFilters.reference
  queryFilters$.value.capacity = activeFilters.capacity
}
const onPageChange = (event: DataTablePageEvent) => {
  queryFilters$.value.offset = event.first
  queryFilters$.value.limit = event.rows
}
</script>

<style scoped></style>
