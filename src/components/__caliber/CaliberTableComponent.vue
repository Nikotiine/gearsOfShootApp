<template>
  <div class="border border-blue-500 mt-2" v-if="store.getAll.isSuccess">
    <DataTable :value="calibers$" :loading="store.getAll.isLoading">
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
import { storeToRefs } from 'pinia'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const store = useCaliberStore()
const { calibers$ } = storeToRefs(store)
</script>

<style scoped></style>
