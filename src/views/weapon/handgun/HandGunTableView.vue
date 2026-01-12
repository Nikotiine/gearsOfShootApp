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
      :loading="isLoading"
      @filter="onFilterChange"
      @page="onPageChange"
      :globalFilterFields="globalFilterFields"
      columnResizeMode="fit"
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
      <Column field="name" :header="t('global.model')" style="max-width: 12rem">
        <template #body="{ data }">
          {{ data.name }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            style="max-width: 10rem"
            @input="filterCallback()"
            :placeholder="t('global.findByName')"
          />
        </template>
      </Column>
      <Column
        :header="t('global.factory')"
        field="factory.id"
        filterField="factory"
        style="max-width: 12rem"
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
            :showClear="true"
          >
          </Select>
        </template>
      </Column>
      <Column :header="t('global.caliber')" field="factory.id" filterField="caliber">
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
            :showClear="true"
          >
          </Select>
        </template>
      </Column>
      <Column field="reference" :header="t('global.reference')">
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
      <Column field="inStock" :header="t('global.inStock')" sortable="-1" :showFilterMenu="false">
        <template #body="{ data }">
          {{ data.inStock }}
        </template>
      </Column>
      <Column :header="t('global.action')" :showFilterMenu="false">
        <template #body="{ data }">
          <action-menu-component
            @on-click-action="onClickAction"
            type="handgun"
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
import { useHandGunStore } from '@/stores/hand-gun.store'
import { useFactoryStore } from '@/stores/factory.store'
import { useCaliberStore } from '@/stores/caliber.store'
import { onBeforeMount, ref, watch } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'
import DataTable, { type DataTableFilterEvent, type DataTablePageEvent } from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import InputIcon from 'primevue/inputicon'
import Select from 'primevue/select'
import IconField from 'primevue/iconfield'
import ActionMenuComponent, {
  type ActionMenuEmit
} from '@/components/__table/ActionMenuComponent.vue'
import { AdminRouterEnum } from '@/enum/router/admin-router.enum'
import { useRouter } from 'vue-router'
import { type NewWeapon, useWeaponStore } from '@/stores/weapon'
import TableTitleComponent from '@/components/__table/TableTitleComponent.vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import type { HandGunDto } from '@/api/Api'
import PublicActionMenuComponent, {
  type PublicActionMenuCEmit
} from '@/components/__table/PublicActionMenuComponent.vue'
import { PublicRouterEnum } from '@/enum/router/public-router.enum'

const { t } = useI18n()
const { category } = defineProps<{
  category: string
}>()
const router = useRouter()
const store = useHandGunStore()
const weaponStore = useWeaponStore()
const factoryStore = useFactoryStore()
const caliberStore = useCaliberStore()
const { queryFilters$ } = storeToRefs(store)
onBeforeMount(() => {
  queryFilters$.value.category = category
})
const i18nPrefix = store.getI18NPrefix
const { data: weaponFactory$ } = factoryStore.getFactoriesByType('weapon')
const { data: calibers$ } = caliberStore.getAll()

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  factory: { value: null, matchMode: FilterMatchMode.EQUALS },
  caliber: { value: null, matchMode: FilterMatchMode.EQUALS },
  reference: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  inStock: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
})
const globalFilterFields = ['name', 'factory', 'caliber', 'reference']
const rowsPerPageOptions = [10, 20, 50]
const filterDisplay = 'menu'

const currentCategory = ref<string>(category)
const { data, isLoading, isError, refetch } = store.getAll()

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
      router.push({ name: AdminRouterEnum.ADMIN_HANDGUN_DETAIL, params: { id: id } })
      break
    case 'edit':
      onEditAction(id)
      router.push({ name: AdminRouterEnum.HANDGUN_EDIT, params: { id: id, category: category } })
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
        name: PublicRouterEnum.PUBLIC_HANDGUN_DETAIL,
        params: { id: id, category: category }
      })
      break
    case 'add':
      console.log('add')
  }
}

const onEditAction = (id: number) => {
  const currentHandgun = data.value?.data.find((handgun: HandGunDto) => handgun.id === id)
  if (currentHandgun) {
    const data: NewWeapon = {
      category: currentHandgun.category,
      type: currentHandgun.type
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
