<template>
  <div class="grid grid-cols-12 gap-8">
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
      <div class="card mb-0 p-2 shadow shadow-gray-400 max-w-80 mx-auto">
        <div class="flex justify-between mb-4">
          <div>
            <span class="block text-muted-color font-medium mb-4">Produits</span>

            <ProductMegaMenu />
          </div>
          <div
            class="flex items-center justify-center bg-cyan-100 dark:bg-cyan-400/10 rounded-border"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-plus text-blue-500"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
      <div class="card mb-0 p-2 shadow shadow-gray-400 max-w-80 mx-auto">
        <div class="flex justify-between mb-4">
          <div>
            <span class="block text-muted-color font-medium mb-4">Listes</span>

            <ListMegaMenu />
          </div>
          <div
            class="flex items-center justify-center bg-cyan-100 dark:bg-cyan-400/10 rounded-border"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-list text-blue-500"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
      <div class="card mb-0 p-2 shadow shadow-gray-400 max-w-80 mx-auto">
        <div class="flex justify-between mb-4">
          <div>
            <span class="block text-muted-color font-medium mb-4">Reference interne</span>
            <InternalReferenceMegaMenu />
          </div>
          <div
            class="flex items-center justify-center bg-cyan-100 dark:bg-cyan-400/10 rounded-border"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-cog text-cyan-500 !text-xl"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
      <div class="card mb-0 p-2 shadow shadow-gray-400 max-w-80 mx-auto">
        <div class="flex justify-between mb-4">
          <div>
            <span class="block text-muted-color font-medium mb-4">USER a faire</span>
            <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">152 Unread</div>
          </div>
          <div
            class="flex items-center justify-center bg-cyan-100 dark:bg-cyan-400/10 rounded-border"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-users text-cyan-500 !text-xl"></i>
          </div>
        </div>
        <span class="text-primary font-medium">85 </span>
        <span class="text-muted-color">responded</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import ProductMegaMenu from '@/components/__admin/ProductMegaMenu.vue'
import ListMegaMenu from '@/components/__admin/ListMegaMenu.vue'
import InternalReferenceMegaMenu from '@/components/__admin/InternalReferenceMegaMenu.vue'

const { t } = useI18n()
</script>

<style scoped></style>
