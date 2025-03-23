<template>
  <div class="card p-4" v-if="store.prerequisiteOpticQuery.isSuccess">
    <h2 class="text-center mt-2 text-2xl">{{ t('optic.list') }}</h2>
    <div class="text-red-500 text-center" v-if="isError">{{ t('global.isLoadingError') }}</div>
    <DataTable
      v-model:filters="filters"
      :value="optics$?.data"
      paginator
      :rows="10"
      dataKey="id"
      filterDisplay="row"
      :loading="storeAreLoading.value"
      :globalFilterFields="['name', 'factory.name', 'type.name', 'reference']"
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
      <template #empty> {{ t('optic.notFound') }} </template>
      <template #loading> {{ t('optic.loading') }} {{ t('global.pleaseWait') }} </template>
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
            :options="factories$?.data"
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
        header="Type"
        filterField="type.name"
        :showFilterMenu="false"
        style="min-width: 14rem"
      >
        <template #body="{ data }">
          {{ data.type.name }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <Select
            v-model="filterModel.value"
            @change="filterCallback()"
            :options="types$"
            placeholder="Type"
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
      <Column field="reference" header="Reference" :showFilterMenu="false" style="min-width: 12rem">
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
            type="optic"
            :reference="data.reference"
            :id="data.id"
        /></template>
      </Column>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import { useOpticStore } from '@/stores/optic'
import IconField from 'primevue/iconfield'

import DataTable from 'primevue/datatable'
import InputText from 'primevue/inputtext'
import Column from 'primevue/column'
import InputIcon from 'primevue/inputicon'
import Select from 'primevue/select'
import { useI18n } from 'vue-i18n'
import { FilterMatchMode } from '@primevue/core/api'
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useFactoryStore } from '@/stores/factory'

import ActionMenuComponent, {
  type ActionMenuEmit
} from '@/components/__table/ActionMenuComponent.vue'
import { RouterEnum } from '@/enum/router.enum'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()
const store = useOpticStore()
const factoryStore = useFactoryStore()
const { data: factories$, isLoading: getFactoriesIsSuccess } =
  factoryStore.getFactoriesByType('optic')
const { types$ } = storeToRefs(store)

const { data: optics$, isError, isLoading, refetch } = store.getAll()

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  'factory.name': { value: null, matchMode: FilterMatchMode.EQUALS },
  'type.name': { value: null, matchMode: FilterMatchMode.EQUALS },
  // 'focalPlane.name': { value: null, matchMode: FilterMatchMode.EQUALS },
  reference: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
})

const storeAreLoading = computed(() => {
  return getFactoriesIsSuccess && isLoading
})

const onClickAction = (event: ActionMenuEmit | boolean, id: number) => {
  switch (event) {
    case 'view':
      router.push({ name: RouterEnum.OPTIC_DETAIL, params: { id: id } })
      break
    case 'edit':
      router.push({ name: RouterEnum.OPTIC_EDIT, params: { id: id } })
      break
    case true:
      store.delete(id)
      refetch()
      break
  }
}
</script>

<style scoped></style>
