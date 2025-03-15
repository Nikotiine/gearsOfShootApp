<template>
  <div class="border border-blue-500 mt-2" v-if="isSuccess">
    <DataTable :value="threadedSizes$?.data" :loading="isLoading">
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-xl font-bold">{{ t('threadedSize.existingList') }}</span>
        </div>
      </template>
      <Column field="size" :header="t('threadedSize.size')"></Column>
      <Column field="ref" :header="t('global.ref')"></Column>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useThreadedSizeStore } from '@/stores/threadedSize'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const { t } = useI18n()
const store = useThreadedSizeStore()
const { data: threadedSizes$, isLoading, isSuccess } = store.getAll()
</script>

<style scoped></style>
