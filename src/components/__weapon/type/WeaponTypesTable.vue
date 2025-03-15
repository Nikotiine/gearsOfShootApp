<template>
  <div class="border border-blue-500 mt-2" v-if="isSuccess">
    <DataTable :value="data?.data" :loading="isLoading">
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-xl font-bold">{{ t('weaponType.existingList') }}</span>
        </div>
      </template>
      <Column field="name" :header="t('weaponType.type')"></Column>
      <Column field="reference" :header="t('global.ref')"></Column>
      <Column field="mode" :header="t('weaponType.mode')"></Column>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useWeaponTypeStore } from '@/stores/weaponType'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const store = useWeaponTypeStore()
const { data, isSuccess, isLoading } = store.getAll()
</script>

<style scoped></style>
