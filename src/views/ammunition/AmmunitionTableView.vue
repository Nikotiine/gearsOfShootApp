<template>
  <div class="card p-4">
    <table-title-component :i18n-prefix="i18nPrefix" :category="category" />
    <div class="text-red-500 text-center" v-if="isError">{{ t('global.isLoadingError') }}</div>
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
      @filter="onFilterChange"
      @page="onPageChange"
      :loading="storeAreLoading.value"
      :globalFilterFields="globalFilterFields"
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
            :options="factories$"
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
            placeholder="Calibre"
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
          <InputText
            @input="filterCallback()"
            placeholder="En Stock"
            v-model="filterModel.value"
            inputId="minmax"
            :min="0"
            :max="100"
            :showFilterMenu="false"
            style="max-width: 4rem"
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
              v-if="$route.meta.admin"
            />
            <public-action-menu-component
              :id="data.id"
              @on-click-action="onPublicClickAction"
              v-else
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
import { AdminRouterEnum } from '@/enum/router/admin-router.enum'
import { useRouter } from 'vue-router'
import ActionMenuComponent, {
  type ActionMenuEmit
} from '@/components/__table/ActionMenuComponent.vue'
import TableTitleComponent from '@/components/__table/TableTitleComponent.vue'
import InvoiceAddItemComponent from '@/components/__invoice/InvoiceAddItemComponent.vue'
import { storeToRefs } from 'pinia'
import { PublicRouterEnum } from '@/enum/router/public-router.enum'
import PublicActionMenuComponent, {
  type PublicActionMenuCEmit
} from '@/components/__table/PublicActionMenuComponent.vue'

const store = useAmmunitionStore()
const caliberStore = useCaliberStore()
const factoryStore = useFactoryStore()
const router = useRouter()

const { t } = useI18n()
const { category } = defineProps<{
  category: string
}>()
const { queryFilters$ } = storeToRefs(store)
onBeforeMount(() => {
  queryFilters$.value.category = category
})
const i18nPrefix = store.getI18NPrefix

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
const globalFilterFields = ['name', 'factory', 'caliber', 'reference']
const rowsPerPageOptions = [10, 20, 50]
const filterDisplay = 'row'
const storeAreLoading = computed(() => {
  return gatAllCalibersIsSuccess || storeIsLoading
})

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

const onClickAction = (event: ActionMenuEmit | boolean, id: number) => {
  switch (event) {
    case 'view':
      router.push({ name: AdminRouterEnum.AMMUNITION_DETAIL, params: { id: id } })
      break
    case 'edit':
      router.push({ name: AdminRouterEnum.AMMUNITION_EDIT, params: { id: id } })
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
        name: PublicRouterEnum.PUBLIC_AMMUNITION_DETAIL,
        params: { id: id, category: category }
      })
      break
    case 'add':
      console.log('add')
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
