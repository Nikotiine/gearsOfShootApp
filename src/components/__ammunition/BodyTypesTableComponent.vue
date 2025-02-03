<template>
  <div class="border border-blue-500 mt-2" v-if="store.getAll.isSuccess">
    <DataTable :value="bodyTypes$" :loading="store.getAll.isLoading">
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-xl font-bold">{{ t('bodyType.existingList') }}</span>
        </div>
      </template>
      <Column field="name" :header="t('bodyType.type')"></Column>
      <Column field="ref" :header="t('global.ref')"></Column>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useBodyTypeStore } from '@/stores/bodyType'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
const store = useBodyTypeStore()
const { t } = useI18n()
const { bodyTypes$ } = storeToRefs(store)
</script>

<style scoped></style>
