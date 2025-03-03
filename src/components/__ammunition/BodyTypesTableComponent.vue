<template>
  <div class="border border-blue-500 mt-2" v-if="isSuccess">
    <DataTable :value="bodyTypes$?.data" :loading="isLoading">
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

const store = useBodyTypeStore()
const { data: bodyTypes$, isLoading, isSuccess } = store.getAll()
const { t } = useI18n()
</script>

<style scoped></style>
