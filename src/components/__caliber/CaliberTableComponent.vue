<template>
  <div class="border border-blue-500 mt-2" v-if="isSuccess">
    <DataTable :value="calibers$?.data" :loading="isLoading">
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-xl font-bold">{{ t('caliber.existingList') }}</span>
        </div>
      </template>
      <Column field="name" :header="t('global.name')"></Column>
      <Column field="ref" :header="t('global.ref')"></Column>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import { useCaliberStore } from '@/stores/caliber'

import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const store = useCaliberStore()
const { data: calibers$, isSuccess, isLoading } = store.getAll()
</script>

<style scoped></style>
