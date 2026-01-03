<template>
  <div class="col-span-12 lg:col-span-6 xl:col-span-3">
    <div class="card mb-0 p-2 shadow shadow-gray-400 max-w-80 mx-auto">
      <div class="flex justify-between mb-4">
        <div>
          <span class="block text-surface-900 dark:text-surface-0 font-medium mb-4">{{
            t('global.invoice')
          }}</span>
          <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
            {{ data?.inOrder }}
            <span :class="GetClassTextColorByOrderStatus('IN_ORDER')">
              {{ t('orderStatus.IN_ORDER') }}</span
            >
          </div>
        </div>
        <div
          class="flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-border cursor-pointer"
          style="width: 2.5rem; height: 2.5rem"
        >
          <Button asChild icon="pi pi-check">
            <RouterLink :to="{ name: AdminRouterEnum.INVOICE_LIST }">
              <i class="pi pi-comment text-purple-500 !text-xl"></i
            ></RouterLink>
          </Button>
        </div>
      </div>
      <span class="text-surface-900 dark:text-surface-0 font-medium">{{ data?.inShipping }} </span>
      <span :class="[GetClassTextColorByOrderStatus('SHIPPING'), 'ml-1']">
        {{ t('orderStatus.SHIPPING') }}</span
      >
      <span class="text-surface-900 dark:text-surface-0 font-medium ml-2"
        >{{ data?.received }}
      </span>
      <span :class="[GetClassTextColorByOrderStatus('RECEIVED'), 'ml-1']">
        {{ t('orderStatus.RECEIVED') }}</span
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import Button from 'primevue/button'
import { AdminRouterEnum } from '@/enum/router/admin-router.enum'
import { useI18n } from 'vue-i18n'
import { useInvoiceStore } from '@/stores/invoice.store'
import { GetClassTextColorByOrderStatus } from '@/shared/utils/colors.utils'

const { t } = useI18n()
const store = useInvoiceStore()
const { data } = store.count()
</script>

<style scoped></style>
