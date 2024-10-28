<template>
  <div class="border border-blue-500 mt-2" v-if="store.getAll.isSuccess">
    <DataTable :value="getAllData$" :loading="store.getAll.isLoading">
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-xl font-bold">{{ t('weaponType.existingList') }}</span>
        </div>
      </template>
      <Column field="name" :header="t('weaponType.type')"></Column>
      <Column field="ref" :header="t('global.ref')"></Column>
      <Column field="mode" :header="t('weaponType.mode')"></Column>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useWeaponTypeStore } from '@/stores/weaponType'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const store = useWeaponTypeStore()
const { getAllData$ } = storeToRefs(store)
</script>

<style scoped></style>
