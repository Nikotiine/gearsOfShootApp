<template>
  <div class="card p-4">
    <h2 class="text-center mt-2 text-2xl">{{ t('ammunition.list.title') }} {{ category }}</h2>
    <div class="text-red-500 text-center" v-if="isError">{{ t('global.isLoadingError') }}</div>
    <DataTable
      v-model:filters="filters"
      :value="data?.data"
      paginator
      :rows="10"
      dataKey="id"
      filterDisplay="row"
      :loading="storeAreLoading"
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
      <template #empty> {{ t('ammunition.list.notFound') }} </template>
      <template #loading>
        {{ t('ammunition.list.loading') }} {{ t('global.pleaseWait') }}
      </template>
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
            :options="factories$"
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
      <!--        <Column field="verified" header="Verified" dataType="boolean" style="min-width: 6rem">
          <template #body="{ data }">
            <i
              class="pi"
              :class="{
                'pi-check-circle text-green-500': data.verified,
                'pi-times-circle text-red-400': !data.verified
              }"
            ></i>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Checkbox
              v-model="filterModel.value"
              :indeterminate="filterModel.value === null"
              binary
              @change="filterCallback()"
            />
          </template>
        </Column>-->
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import { useAmmunitionStore } from '@/stores/ammunition'
import { useCaliberStore } from '@/stores/caliber'
import { useFactoryStore } from '@/stores/factory'
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { FilterMatchMode } from '@primevue/core/api'
import { useI18n } from 'vue-i18n'
const { category } = defineProps<{
  category: string
}>()
const { t } = useI18n()
const store = useAmmunitionStore()
const caliberStore = useCaliberStore()
const factoryStore = useFactoryStore()
factoryStore.setTypeOfFactories('ammunition')
const currentCategory = ref<string>(category)
const { data, refetch, isError, isLoading: storeIsLoading } = store.getByCategory(currentCategory)
const { calibers$ } = storeToRefs(caliberStore)
const { factories$ } = storeToRefs(factoryStore)

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  'factory.name': { value: null, matchMode: FilterMatchMode.EQUALS },
  'caliber.name': { value: null, matchMode: FilterMatchMode.EQUALS },
  reference: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
})

const storeAreLoading = computed(() => {
  return caliberStore.getAll.isLoading || storeIsLoading.value
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
</script>

<style scoped></style>
