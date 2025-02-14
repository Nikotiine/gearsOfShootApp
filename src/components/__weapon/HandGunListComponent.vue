<template>
  <div class="card p-4">
    <!--    <h2 class="text-center mt-2 text-2xl">Liste des armes de Categorie {{ category }}</h2>-->
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
          <div class="flex justify-between">
            <Button
              icon="pi pi-eye"
              rounded
              aria-label="Filter"
              as="router-link"
              :to="'/detail/handgun/' + data.id"
            />
            <Button
              icon="pi pi-pencil"
              rounded
              aria-label="Filter"
              severity="warn"
              as="router-link"
              :to="'/admin/gestion/edit/weapon/handgun/' + data.id"
            />
            <!--  <Button
           icon="pi pi-trash"
           rounded
           aria-label="Filter"
           severity="danger"
           as="router-link"
         />-->
          </div></template
        >
      </Column>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import { useHandGunStore } from '@/stores/hand-gun'
import { useFactoryStore } from '@/stores/factory'
import { useCaliberStore } from '@/stores/caliber'
import { ref, watch, watchEffect } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import InputIcon from 'primevue/inputicon'
import Select from 'primevue/select'
import Button from 'primevue/button'
import IconField from 'primevue/iconfield'
import { useWeaponCategoryStore } from '@/stores/weapon-category'
const { category } = defineProps<{
  category: string
}>()
const store = useHandGunStore()
const factoryStore = useFactoryStore()
const { data: weaponFactory$ } = factoryStore.getFactoriesByType('weapon')
const caliberStore = useCaliberStore()
const { data: calibers$ } = caliberStore.getAll()
const categoryStore = useWeaponCategoryStore()
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
</script>

<style scoped></style>
