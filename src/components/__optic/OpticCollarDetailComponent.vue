<template>
  <div class="" v-if="collar">
    <h2 class="text-2xl font-bold mb-4 text-center mt-10">
      <span class="text-blue-500">{{ t('global.collar') }}</span> : {{ collar.factory.name }} -
      {{ collar.name }}
    </h2>
    <div class="p-6 mt-6" v-if="collar">
      <Tabs value="0">
        <TabList>
          <Tab value="0">{{ t('global.importantInformation') }}</Tab>
          <Tab value="1">{{ t('global.description') }}</Tab>
          <Tab value="2">{{ t('global.associatedProducts') }}</Tab>
          <Tab value="3">{{ t('global.price') }}</Tab>
          <Tab value="4">{{ t('global.stock') }}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="0">
            <TabCardComponent :props="importantInfo" v-if="importantInfo" />
          </TabPanel>
          <TabPanel value="1">
            <p>
              {{
                collar.description && collar.description.length > 0
                  ? collar.description
                  : t('global.notRegistered')
              }}
            </p>
          </TabPanel>
          <TabPanel value="2">
            <p>// Feature</p>
          </TabPanel>
          <TabPanel value="3">
            <tab-price-component :id="id" type="OPTIC_COLLAR" :price="collar.priceHistory" />
          </TabPanel>
          <TabPanel value="4">
            <tab-stock-component :stock="collar.stock" />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <audit-info-component
        :created-by="collar.createdBy"
        :updated-by="collar.updatedBy"
        :created-at="collar.createdAt"
        :update-at="collar.updatedAt"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useOpticCollarStore } from '@/stores/optic-collar.store'
import { computed } from 'vue'
import { NumberFormatter } from '@/shared/utils/formatter.utils'
import TabCardComponent from '@/components/__tabs/TabCardComponent.vue'
import TabPanels from 'primevue/tabpanels'
import Tab from 'primevue/tab'

import TabList from 'primevue/tablist'
import Tabs from 'primevue/tabs'
import TabPanel from 'primevue/tabpanel'
import ShowPriceHistoryButton from '@/components/__layout/ShowPriceHistoryButton.vue'
import AuditInfoComponent from '@/components/__detail/AuditInfoComponent.vue'
import TabPriceComponent from '@/components/__tabs/TabPriceComponent.vue'
import TabStockComponent from '@/components/__tabs/TabStockComponent.vue'
const { t } = useI18n()
const { id } = defineProps<{
  id: string
}>()
const store = useOpticCollarStore()
const i18nPrefix = store.getI18NPrefix
const { data: collar } = store.getById(id)
const importantInfo = computed(() => {
  if (!collar.value) return undefined
  return [
    {
      label: t('global.factory'),
      title: collar.value.factory.name
    },
    {
      label: t('global.model'),
      title: collar.value.name
    },
    {
      label: t('global.diameter'),
      title: NumberFormatter(collar.value.diameter, 'mm')
    },
    {
      label: t('global.height'),
      title: NumberFormatter(collar.value.height, 'mm')
    },
    {
      label: t(i18nPrefix + 'rail'),
      title: collar.value.railSize.name
    },
    {
      label: t('global.reference'),
      title: collar.value.reference
    }
  ]
})
const priceInfo = computed(() => {
  if (!collar.value || !collar.value.priceHistory) return undefined
  return [
    {
      label: t('priceHistory.supplierPrice'),
      title: NumberFormatter(collar.value.priceHistory.supplierPrice, 'euro')
    },
    {
      label: t('priceHistory.recommendedSalePrice'),
      title: NumberFormatter(collar.value.priceHistory.recommendedSalePrice, 'euro')
    },
    {
      label: t('priceHistory.currentSalePrice'),
      title: NumberFormatter(collar.value.priceHistory.currentSalePrice, 'euro')
    }
  ]
})
</script>

<style scoped></style>
