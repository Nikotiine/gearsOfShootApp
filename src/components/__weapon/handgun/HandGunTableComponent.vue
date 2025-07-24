<template>
  <div class="card p-4">
    <table-title-component :i18n-prefix="i18nPrefix" />
    <div class="text-red-500 text-center" v-if="isError">Error</div>
    <DataTable
      v-model:filters="filters"
      :value="handgun$?.data"
      paginator
      :rows="10"
      dataKey="id"
      filterDisplay="row"
      :loading="datasIsloading"
      :globalFilterFields="['name', 'factory.name', 'caliber.name', 'reference']"
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
      <template #empty> Aucune arme trouvée. </template>
      <template #loading> Loading customers data. Please wait. </template>
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
        header="Marque"
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
            :options="weaponFactory$?.data"
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
            :options="calibers$?.data"
            placeholder="Calibre"
            optionLabel="name"
            optionValue="name"
            style="min-width: 12rem"
            :showClear="true"
          >
          </Select>
        </template>
      </Column>
      <Column field="reference" header="Status" :showFilterMenu="false" style="min-width: 12rem">
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
import { useHandGunStore } from '@/stores/hand-gun.store'
import { useFactoryStore } from '@/stores/factory.store'
import { useCaliberStore } from '@/stores/caliber.store'
import { ref, watch } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import InputIcon from 'primevue/inputicon'
import Select from 'primevue/select'
import IconField from 'primevue/iconfield'
import ActionMenuComponent, {
  type ActionMenuEmit
} from '@/components/__table/ActionMenuComponent.vue'
import { RouterEnum } from '@/enum/router.enum'
import { useRouter } from 'vue-router'
import { type NewWeapon, useWeaponStore } from '@/stores/weapon'
import TableTitleComponent from '@/components/__table/TableTitleComponent.vue'

const { category } = defineProps<{
  category: string
}>()
const router = useRouter()
const store = useHandGunStore()
const i18nPrefix = store.getI18NPrefix
const factoryStore = useFactoryStore()
const { data: weaponFactory$ } = factoryStore.getFactoriesByType('weapon')
const caliberStore = useCaliberStore()
const { data: calibers$ } = caliberStore.getAll()

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  'factory.name': { value: null, matchMode: FilterMatchMode.EQUALS },
  'caliber.name': { value: null, matchMode: FilterMatchMode.EQUALS },
  reference: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
})
const currentCategory = ref<string>(category)
const {
  data: handgun$,
  isLoading: datasIsloading,
  isError,
  refetch
} = store.getAllByCategory(currentCategory)
watch(
  () => category,
  (newCategory) => {
    if (newCategory !== currentCategory.value) {
      currentCategory.value = newCategory
      refetch()
    }
  }
)
const weaponStore = useWeaponStore()
const onClickAction = (event: ActionMenuEmit | boolean, id: number) => {
  switch (event) {
    case 'view':
      router.push({ name: RouterEnum.HANDGUN_DETAIL, params: { id: id } })
      break
    case 'edit':
      onEditAction(id)
      router.push({ name: RouterEnum.HANDGUN_EDIT, params: { id: id } })
      break
    case true:
      store.delete(id)
      refetch()
      break
  }
}
const onEditAction = (id: number) => {
  const currentWeapon = handgun$.value?.data.find((h) => h.id === id)
  if (currentWeapon) {
    const data: NewWeapon = {
      category: currentWeapon.category,
      type: currentWeapon.type
    }
    weaponStore.setOptions(data)
  }
}
</script>

<style scoped></style>
