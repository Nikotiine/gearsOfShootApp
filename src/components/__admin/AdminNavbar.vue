<template>
  <Panel :header="t('adminNavbar.title')" toggleable collapsed>
    <div class="grid grid-cols-12 gap-8">
      <div class="col-span-12 lg:col-span-6 xl:col-span-3 max-sm:max-w-64">
        <ProductMegaMenu />
      </div>
      <div class="col-span-12 lg:col-span-6 xl:col-span-3 max-sm:max-w-64">
        <ListMegaMenu />
      </div>
      <div class="col-span-12 lg:col-span-6 xl:col-span-3 max-sm:max-w-64">
        <InternalReferenceMegaMenu />
      </div>
    </div>
  </Panel>
</template>
<script setup lang="ts">
import Panel from 'primevue/panel'
import ProductMegaMenu from '@/components/__admin/ProductMegaMenu.vue'
import ListMegaMenu from '@/components/__admin/ListMegaMenu.vue'
import { useI18n } from 'vue-i18n'
import InternalReferenceMegaMenu from '@/components/__admin/InternalReferenceMegaMenu.vue'

const { t } = useI18n()
</script>

<style scoped></style>
