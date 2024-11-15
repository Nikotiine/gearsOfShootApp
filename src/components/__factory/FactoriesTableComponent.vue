<template>
  <div class="card">
    <h2 class="text-center mt-2 text-2xl">{{ t('factory.existingList') }}</h2>
    <div class="text-red-500 text-center" v-if="store.getAll.isError">
      {{ t('error.' + store.getAll.error.response.data.message) }}
    </div>
    <div class="mt-2" v-if="store.getAll.isSuccess">
      <DataTable
        v-model:filters="filters"
        :value="factories$"
        paginator
        :rows="10"
        dataKey="id"
        filterDisplay="row"
        :loading="store.getAll.isLoading"
        :globalFilterFields="['name', 'type', 'ref']"
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
        <template #empty> No customers found. </template>
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
          field="type.name"
          filterField="type.name"
          style="min-width: 12rem"
          :showFilterMenu="false"
        >
          <template #body="{ data }">
            {{ data.type.name }}
          </template>

          <template #filter="{ filterModel, filterCallback }">
            <Select
              v-model="filterModel.value"
              @change="filterCallback()"
              :options="store.getFactoryTypes.data?.data.types"
              optionLabel="name"
              optionValue="name"
              placeholder="Marque de "
              style="min-width: 12rem"
              :showClear="true"
            >
            </Select>
          </template>
        </Column>
        <Column header="ref" filterField="ref" :showFilterMenu="false" style="min-width: 14rem">
          <template #body="{ data }">
            {{ data.ref }}
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
      </DataTable>
    </div>
  </div>
</template>
<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useFactoryStore } from '@/stores/factory'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import Select from 'primevue/select'
import InputIcon from 'primevue/inputicon'
import { FilterMatchMode } from '@primevue/core/api'
import { ref } from 'vue'

const props = defineProps<{
  type?: string
}>()

const { t } = useI18n()
const store = useFactoryStore()
const { factories$ } = storeToRefs(store)

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  'type.name': { value: props.type || null, matchMode: FilterMatchMode.EQUALS },
  ref: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
})
</script>

<style scoped></style>
