<template>
  <div class="border border-blue-500 mt-2" v-if="store.getAll.isSuccess">
    <DataTable :value="threadedSizes$" :loading="store.getAll.isLoading">
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
import { storeToRefs } from 'pinia'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const { t } = useI18n()
const store = useThreadedSizeStore()
const { threadedSizes$ } = storeToRefs(store)
</script>

<style scoped></style>
