<template>
  <div class="border border-blue-500 mt-2" v-if="isSuccess">
    <DataTable :value="headTypes$?.data" :loading="isLoading">
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-xl font-bold">{{ t(i18nPrefix + 'existingList') }}</span>
        </div>
      </template>
      <Column field="name" :header="t(i18nPrefix + 'weapon-type')"></Column>
      <Column field="ref" :header="t('global.ref')"></Column>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

import { useHeadTypeStore } from '@/stores/head-type.store'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const store = useHeadTypeStore()
const { data: headTypes$, isLoading, isSuccess } = store.getAll()
const i18nPrefix = store.getI18NPrefix
</script>

<style scoped></style>
