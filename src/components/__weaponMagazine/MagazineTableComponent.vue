<template>
  <div class="card p-4">
    <h2 class="text-center mt-2 text-2xl">{{ t('magazine.list') }} {{ category }}</h2>
    <div class="text-red-500 text-center" v-if="isError">Error</div>
    <DataTable
      v-model:filters="filters"
      :value="magazines$?.data"
      paginator
      :rows="10"
      dataKey="id"
      filterDisplay="row"
      :loading="isLoading"
      :globalFilterFields="['reference', 'factory.name', 'caliber.name', 'capacity']"
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
            :options="magazineFactory$?.data"
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
      <Column field="capacity" header="Capacité" :showFilterMenu="false" style="min-width: 3rem">
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
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import { useWeaponMagazineStore } from '@/stores/weapon-magazine'
import { ref, watch } from 'vue'
import IconField from 'primevue/iconfield'

import DataTable from 'primevue/datatable'
import InputText from 'primevue/inputtext'
import Column from 'primevue/column'
import InputIcon from 'primevue/inputicon'
import Select from 'primevue/select'
import { FilterMatchMode } from '@primevue/core/api'
import { useFactoryStore } from '@/stores/factory'
import { useCaliberStore } from '@/stores/caliber'

import { RouterEnum } from '@/enum/router.enum'
import ActionMenuComponent, {
  type ActionMenuEmit
} from '@/components/__table/ActionMenuComponent.vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { category } = defineProps<{
  category: string
}>()
const { t } = useI18n()
const factoryStore = useFactoryStore()
const { data: magazineFactory$ } = factoryStore.getFactoriesByType('magazine')
const caliberStore = useCaliberStore()
const { data: calibers$ } = caliberStore.getAll()
const currentCategory = ref<string>(category)
const store = useWeaponMagazineStore()
const { data: magazines$, isError, isLoading, refetch } = store.getByCategory(currentCategory)
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  reference: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  'factory.name': { value: null, matchMode: FilterMatchMode.EQUALS },
  'caliber.name': { value: null, matchMode: FilterMatchMode.EQUALS },
  capacity: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
})
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
      router.push({ name: RouterEnum.MAGAZINE_DETAIL, params: { id: id } })
      break
    case 'edit':
      router.push({ name: RouterEnum.MAGAZINE_EDIT, params: { id: id } })
      break
    case true:
      store.delete(id)
      refetch()
      break
  }
}
</script>

<style scoped></style>
