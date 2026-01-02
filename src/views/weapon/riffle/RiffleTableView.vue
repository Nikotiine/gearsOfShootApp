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
      :rowsPerPageOptions="rowsPerPageOptions"
      dataKey="id"
      lazy
      currentPageReportTemplate="{first} to {last} of {totalRecords}"
      :filterDisplay="filterDisplay"
      :loading="datasIsloading"
      :globalFilterFields="globalFilterFields"
      @filter="onFilterChange"
      @page="onPageChange"
      columnResizeMode="fit"
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
            :placeholder="t('global.findByName')"
          />
        </template>
      </Column>
      <Column
        :header="t('global.factory')"
        field="factory.id"
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
            :options="weaponFactory$"
            optionLabel="name"
            optionValue="id"
            :placeholder="t('global.findByFactory')"
            style="min-width: 12rem"
            :showClear="true"
          >
          </Select>
        </template>
      </Column>
      <Column
        :header="t('global.caliber')"
        field="caliber.id"
        filterField="caliber"
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
            :placeholder="t('global.findByCaliber')"
            optionLabel="name"
            optionValue="id"
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
      <Column header="Actions" :showFilterMenu="false" style="min-width: 12rem">
        <template #body="{ data }">
          <action-menu-component
            @on-click-action="onClickAction"
            type="handgun"
            :reference="data.reference"
            :id="data.id"
        /></template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { useRiffleStore } from '@/stores/riffle.store'
import { FilterMatchMode } from '@primevue/core/api'
import { onBeforeMount, ref, watch } from 'vue'
import DataTable, { type DataTableFilterEvent, type DataTablePageEvent } from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import InputIcon from 'primevue/inputicon'
import Select from 'primevue/select'
import IconField from 'primevue/iconfield'
import { useFactoryStore } from '@/stores/factory.store'
import { useCaliberStore } from '@/stores/caliber.store'
import ActionMenuComponent, { type ActionMenuEmit } from '@/components/__table/ActionMenuComponent.vue'
import { RouterEnum } from '@/enum/router.enum'
import { type NewWeapon, useWeaponStore } from '@/stores/weapon'
import { useRouter } from 'vue-router'
import TableTitleComponent from '@/components/__table/TableTitleComponent.vue'
import { storeToRefs } from 'pinia'
import type { RiffleDto } from '@/api/Api'
import { useI18n } from 'vue-i18n'

const { category } = defineProps<{
  category: string
}>()
const store = useRiffleStore()
const i18nPrefix = store.getI18NPrefix
const { t } = useI18n()
const factoryStore = useFactoryStore()
const caliberStore = useCaliberStore()
const weaponStore = useWeaponStore()
const { queryFilters$ } = storeToRefs(store)
const router = useRouter()
onBeforeMount(() => {
  queryFilters$.value.category = category
})
const { data: weaponFactory$ } = factoryStore.getFactoriesByType('weapon')

const { data: calibers$ } = caliberStore.getAll()
const currentCategory = ref<string>(category)
const { data, isLoading: datasIsloading, isError, refetch } = store.getAll()

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  factory: { value: null, matchMode: FilterMatchMode.EQUALS },
  caliber: { value: null, matchMode: FilterMatchMode.EQUALS },
  reference: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
})
const globalFilterFields = ['name', 'factory', 'caliber', 'reference']
const rowsPerPageOptions = [10, 20, 50]
const filterDisplay = 'menu'
watch(
  () => category,
  (newCategory) => {
    if (newCategory !== currentCategory.value) {
      currentCategory.value = newCategory
      refetch()
    }
  }
)

const onClickAction = (event: ActionMenuEmit | boolean, id: number) => {
  switch (event) {
    case 'view':
      router.push({ name: RouterEnum.RIFFLE_DETAIL, params: { id: id } })
      break
    case 'edit':
      onEditAction(id)
      router.push({ name: RouterEnum.RIFFLE_EDIT, params: { id: id } })
      break
    case true:
      store.delete(id)
      refetch()
      break
  }
}

const onEditAction = (id: number) => {
  const currentWeapon = data.value?.data.find((r: RiffleDto) => r.id === id)
  if (currentWeapon) {
    const data: NewWeapon = {
      category: currentWeapon.category,
      type: currentWeapon.type
    }
    weaponStore.setOptions(data)
  }
}
const onFilterChange = (event: DataTableFilterEvent) => {
  const activeFilters = Object.fromEntries(
    Object.entries(event.filters).map(([key, meta]: any) => [key, meta.value])
  )
  queryFilters$.value.factoryId = activeFilters.factory
  queryFilters$.value.caliberId = activeFilters.caliber
  queryFilters$.value.name = activeFilters.name
  queryFilters$.value.reference = activeFilters.reference
}
const onPageChange = (event: DataTablePageEvent) => {
  queryFilters$.value.offset = event.first
  queryFilters$.value.limit = event.rows
}
</script>

<style scoped></style>
