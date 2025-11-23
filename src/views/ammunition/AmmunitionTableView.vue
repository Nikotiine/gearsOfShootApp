<template>
  <div class="card p-4">
    <table-title-component :i18n-prefix="i18nPrefix" :category="category" />
    <div class="text-red-500 text-center" v-if="isError">{{ t('global.isLoadingError') }}</div>
    <DataTable
      v-model:filters="filters"
      :value="data?.data"
      paginator
      :rows="queryFilter$.limit"
      :total-records="data?.total"
      :rowsPerPageOptions="[10, 20, 50]"
      dataKey="id"
      lazy
      currentPageReportTemplate="{first} to {last} of {totalRecords}"
      filterDisplay="row"
      @filter="onFilterChange"
      @page="onPageChange"
      :loading="storeAreLoading.value"
      :globalFilterFields="['name', 'factory', 'caliber', 'reference']"
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
        style="min-width: 10rem"
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
        :header="t('global.caliber')"
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
        style="max-width: 5rem"
      >
        <template #body="{ data }">
          {{ data.inStock }}
        </template>

        <template #filter="{ filterModel, filterCallback }">
          <InputNumber
            @input="filterCallback()"
            placeholder="En Stock"
            v-model="filterModel.value"
            inputId="minmax"
            :min="0"
            :max="100"
            style="min-width: 5rem"
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
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'

import Select from 'primevue/select'
import Column from 'primevue/column'
import DataTable, { type DataTableFilterEvent, type DataTablePageEvent } from 'primevue/datatable'
import { useAmmunitionStore } from '@/stores/ammunition.store'
import { useCaliberStore } from '@/stores/caliber.store'
import { useFactoryStore } from '@/stores/factory.store'
import { computed, onBeforeMount, ref, watch } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'
import { useI18n } from 'vue-i18n'
import { RouterEnum } from '@/enum/router.enum'
import { useRouter } from 'vue-router'
import ActionMenuComponent, {
  type ActionMenuEmit
} from '@/components/__table/ActionMenuComponent.vue'
import TableTitleComponent from '@/components/__table/TableTitleComponent.vue'
import InvoiceAddItemComponent from '@/components/__invoice/InvoiceAddItemComponent.vue'
import { storeToRefs } from 'pinia'
import InputNumber from 'primevue/inputnumber'

const { category } = defineProps<{
  category: string
}>()
const { t } = useI18n()
const store = useAmmunitionStore()
const { queryFilter$ } = storeToRefs(store)

onBeforeMount(() => {
  queryFilter$.value.category = category
})

const i18nPrefix = store.getI18NPrefix
const router = useRouter()
const caliberStore = useCaliberStore()
const factoryStore = useFactoryStore()
const { data: factories$ } = factoryStore.getFactoriesByType('ammunition')
const currentCategory = ref<string>(category)
const { data, refetch, isError, isLoading: storeIsLoading } = store.getByCategory()
const { data: calibers$, isLoading: gatAllCalibersIsSuccess } = caliberStore.getAll()

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  factory: { value: null, matchMode: FilterMatchMode.EQUALS },
  caliber: { value: null, matchMode: FilterMatchMode.EQUALS },
  inStock: { value: null, matchMode: FilterMatchMode.EQUALS },
  reference: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
})

const storeAreLoading = computed(() => {
  return gatAllCalibersIsSuccess || storeIsLoading
})

const onFilterChange = (event: DataTableFilterEvent) => {
  const activeFilters = Object.fromEntries(
    Object.entries(event.filters).map(([key, meta]: any) => [key, meta.value])
  )
  queryFilter$.value.factory = activeFilters.factory
  queryFilter$.value.caliber = activeFilters.caliber
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
      router.push({ name: RouterEnum.AMMUNITION_DETAIL, params: { id: id } })
      break
    case 'edit':
      router.push({ name: RouterEnum.AMMUNITION_EDIT, params: { id: id } })
      break
    case true:
      store.delete(id)
      refetch()
      break
  }
}
watch(
  () => category,
  (newCategory) => {
    if (newCategory !== currentCategory.value) {
      currentCategory.value = newCategory
      refetch()
    }
  }
)
</script>

<style scoped></style>
