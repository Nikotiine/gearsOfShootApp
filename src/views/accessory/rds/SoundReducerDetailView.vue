<template>
  <h2 class="text-2xl font-bold mb-4 text-blue-500 text-center mt-10" v-if="rds">
    <span class="text-white">{{ t(i18nPrefix + 'detailTitle') }}</span> : {{ rds.factory.name }} -
    {{ rds.name }}
  </h2>

  <div class="p-6 mt-6" v-if="rds">
    <Tabs value="0">
      <TabList>
        <Tab value="0">{{ t('global.importantInformation') }}</Tab>
        <Tab value="1">{{ t('global.description') }}</Tab>
        <Tab value="2">{{ t('global.associatedProducts') }}</Tab>
        <Tab value="3" v-if="$route.meta.admin">{{ t('global.price') }}</Tab>
        <Tab value="4" v-if="$route.meta.admin">{{ t('global.stock') }}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <TabCardComponent :props="importantInfo" v-if="importantInfo" />
        </TabPanel>

        <TabPanel value="1">
          <p>
            {{
              rds.description && rds.description.length > 0
                ? rds.description
                : t('global.notRegistered')
            }}
          </p>
        </TabPanel>
        <TabPanel value="2">
          <p>// Feature</p>
        </TabPanel>
        <TabPanel value="3" v-if="$route.meta.admin">
          <tab-price-component :id="id" type="RDS" :price="rds.priceHistory" />
        </TabPanel>
        <TabPanel value="4" v-if="$route.meta.admin">
          <tab-stock-component :stock="rds.stock" />
        </TabPanel>
      </TabPanels>
    </Tabs>
    <audit-info-component
      :created-by="rds.createdBy"
      :updated-by="rds.updatedBy"
      :created-at="rds.createdAt"
      :update-at="rds.updatedAt"
      v-if="$route.meta.admin"
    />
  </div>
  <div class="flex justify-center">
    <add-to-cart-button :item="item" v-if="item" />
  </div>
</template>
<script setup lang="ts">
import { useSoundReducerStore } from '@/stores/sound-noise-reducer.store'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import {
  BooleanFormatter,
  NumberFormatter,
  VerifyFieldIsNotNull
} from '@/shared/utils/formatter.utils'
import TabPanels from 'primevue/tabpanels'
import Tab from 'primevue/tab'
import TabCardComponent from '@/components/__tabs/TabCardComponent.vue'
import TabList from 'primevue/tablist'
import Tabs from 'primevue/tabs'
import TabPanel from 'primevue/tabpanel'
import AuditInfoComponent from '@/components/__detail/AuditInfoComponent.vue'
import TabPriceComponent from '@/components/__tabs/TabPriceComponent.vue'
import TabStockComponent from '@/components/__tabs/TabStockComponent.vue'
import AddToCartButton from '@/components/__cart/AddToCartButton.vue'

const { t } = useI18n()
const { id } = defineProps<{
  id: string
}>()

const store = useSoundReducerStore()

const { data: rds } = store.getById(id)
const item = computed(() => {
  if (rds.value) {
    return store.mapDtoToDataViewProps(rds.value)
  }
  return null
})
const i18nPrefix = store.getI18NPrefix
const importantInfo = computed(() => {
  if (!rds.value) return undefined
  return [
    {
      label: t(i18nPrefix + 'caliber'),
      title: rds.value.caliber.name
    },
    {
      label: t(i18nPrefix + 'factory'),
      title: rds.value.factory.name
    },
    {
      label: t(i18nPrefix + 'threadedSize'),
      title: rds.value.threadedSize.size
    },
    {
      label: t(i18nPrefix + 'name'),
      title: rds.value.name
    },

    {
      label: t(i18nPrefix + 'diameter'),
      title: NumberFormatter(rds.value.diameter, 'mm')
    },
    {
      label: t(i18nPrefix + 'estimatedNoiseReduction'),
      title: NumberFormatter(rds.value.estimatedNoiseReduction, 'db')
    },
    {
      label: t(i18nPrefix + 'chicane'),
      title: VerifyFieldIsNotNull(rds.value.chicane)
    },
    {
      label: t(i18nPrefix + 'isCleanable'),
      title: BooleanFormatter(rds.value.isCleanable)
    },
    {
      label: t('global.reference'),
      title: rds.value.reference
    }
  ]
})
</script>

<style scoped></style>
