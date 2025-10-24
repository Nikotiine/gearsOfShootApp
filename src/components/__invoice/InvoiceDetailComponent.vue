<template>
  <div v-if="invoice" class="p-6 bg-gray-100 shadow-md">
    <div class="grid grid-cols-2 gap-4 mb-4">
      <!-- Informations de commande -->
      <div>
        <h2 class="text-xl font-semibold mb-2">
          <span class="text-blue-500">{{ t(i18nPrefix + 'detailTitle') }}</span>
          {{ invoice.internalInvoiceReference }}
        </h2>
        <p>
          <strong>{{ t(i18nPrefix + 'createdAt') }}</strong>
          {{ DateFormatter(invoice.createdAt, 'short') }}
        </p>
        <p>
          <strong>{{ t(i18nPrefix + 'createdBy') }}</strong> {{ invoice.createdBy.lastName }}-{{
            invoice.createdBy.firstName
          }}
        </p>
        <p>
          <strong>{{ t('global.' + 'status') }} : </strong>
          <span :class="allReceived ? 'text-green-400' : 'text-red-500'">
            {{ allReceived ? t(i18nPrefix + 'received') : t(i18nPrefix + 'pending') }}</span
          >
        </p>
      </div>

      <!-- Fournisseur -->
      <div class="text-right mr-4">
        <h3 class="text-lg font-semibold mb-1">{{ t(i18nPrefix + 'supplier') }}</h3>
        <p>{{ invoice.supplier.name }}</p>
        <p>{{ invoice.supplier.address }}</p>
        <p>{{ invoice.supplier.city }}, {{ invoice.supplier.zipCode }}</p>
        <p>{{ invoice.supplier.siret }}</p>
      </div>
    </div>

    <Divider />

    <!-- 🔹 Tableau des articles -->
    <DataTable :value="invoice.items" responsiveLayout="scroll" class="mb-6">
      <Column field="name" :header="t(i18nPrefix + 'item')">
        <template #body="{ data }">
          {{ data.factory.name }} : {{ data.name }} <br />
          ({{ data.reference }})
        </template>
      </Column>
      <Column field="quantity" :header="t('global.quantity')" />
      <Column field="unitPriceHt" :header="t(i18nPrefix + 'unitPriceHt')">
        <template #body="{ data }">
          {{ NumberFormatter(data.unitPriceHt, 'euro') }}
        </template>
      </Column>
      <Column :header="t(i18nPrefix + 'totalPriceHT')" field="totalPriceHT">
        <template #body="{ data }">
          {{ NumberFormatter(data.totalPriceHT, 'euro') }}
        </template>
      </Column>
      <Column field="status" :header="t('global.status')">
        <template #body="{ data }">
          {{ t('orderStatus.' + data.status) }}
          <InvoiceEditStatusButton :current-status="data.status" :item-id="data.id" />
        </template>
      </Column>
    </DataTable>

    <!-- 🔹 Totaux et paiements -->
    <div class="grid grid-cols-2 mt-4">
      <!-- Colonne gauche : Infos paiement -->
      <div>
        <p>
          <strong>{{ t(i18nPrefix + 'dueDate') }}</strong>
          {{ DateFormatter(invoice.dueDate, 'short') }}
        </p>
        <p>
          <strong>{{ t(i18nPrefix + 'totalAccountHT') }}</strong>
          {{ NumberFormatter(invoice.totalAccountHT, 'euro') }}
        </p>
        <!--      <p><strong>Tva :</strong> {{ NumberFormatter(invoice.vat, 'percent') }}</p>-->
        <p>
          <strong>{{ t(i18nPrefix + 'totalRemaining') }}</strong>
          {{
            invoice.totalPriceHt - invoice.totalAccountHT === 0
              ? t(i18nPrefix + 'paymentCompleted')
              : NumberFormatter(invoice.totalPriceHt - invoice.totalAccountHT, 'euro')
          }}
        </p>
      </div>

      <!-- Colonne droite : Total général -->
      <div class="flex items-end justify-end text-lg font-semibold">
        <p>
          <strong>{{ t(i18nPrefix + 'totalPriceHt') }}</strong>
          {{ NumberFormatter(invoice.totalPriceHt, 'euro') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useInvoiceStore } from '@/stores/invoice.store'
import { DateFormatter, NumberFormatter } from '@/shared/utils/formatter.utils'

import Divider from 'primevue/divider'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import InvoiceEditStatusButton from '@/components/__invoice/InvoiceEditStatusButton.vue'
const store = useInvoiceStore()
const i18nPrefix = store.getI18NPrefix
const { t } = useI18n()
const { id } = defineProps<{
  id: string
}>()
const { data: invoice } = store.getById(id)

const allReceived = computed(() => {
  return invoice.value?.items.every((item) => item.status === 'RECEIVED')
})
</script>

<style scoped></style>
