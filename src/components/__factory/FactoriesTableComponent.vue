<template>
  <div class="card">
    <h2 class="text-center mt-2 text-2xl">{{ t('factory.existingList') }}</h2>
    <div class="text-red-500 text-center" v-if="isError">
      {{ t('error.' + error.response.data.message) }}
    </div>
    <div class="mt-2" v-if="isSuccess">
      <DataTable
        v-model:filters="filters"
        :value="factories$"
        paginator
        :rows="10"
        dataKey="id"
        filterDisplay="row"
        :loading="isLoading"
        :globalFilterFields="['name', 'type', 'reference']"
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
            {{ data.reference }}
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
        <Column header="Actions" :showFilterMenu="false" style="min-width: 12rem">
          <template #body="{ data }">
            <action-menu-component
              @on-click-action="onClickAction"
              type="magazine"
              :reference="data.reference"
              :id="data.id"
          /></template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useFactoryStore } from '@/stores/factory.store'
import { useI18n } from 'vue-i18n'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import Select from 'primevue/select'
import InputIcon from 'primevue/inputicon'
import { FilterMatchMode } from '@primevue/core/api'
import { ref } from 'vue'
import ActionMenuComponent, {
  type ActionMenuEmit
} from '@/components/__table/ActionMenuComponent.vue'
import { RouterEnum } from '@/enum/router.enum'
import { useRouter } from 'vue-router'

const props = defineProps<{
  type?: string
}>()

const { t } = useI18n()
const store = useFactoryStore()
const {
  isError,
  isSuccess,
  isLoading,
  error,
  data: factories$,
  refetch
} = store.getFactoriesByType()

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  'type.name': { value: props.type || null, matchMode: FilterMatchMode.EQUALS },
  ref: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
})
const router = useRouter()
const onClickAction = (event: ActionMenuEmit | boolean, id: number) => {
  switch (event) {
    case 'view':
      router.push({ name: RouterEnum.AMMUNITION_DETAIL, params: { id: id } })
      break
    case 'edit':
      router.push({ name: RouterEnum.FACTORY_EDIT, params: { id: id } })
      break
    case true:
      store.delete(id)
      refetch()
      break
  }
}
</script>

<style scoped></style>
