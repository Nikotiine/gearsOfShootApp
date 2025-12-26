<template>
  <h2 class="text-2xl font-bold mb-4 text-center mt-10" v-if="riffle">
    <span class="field-capitalise-underlined-semi-bold text-blue-500">{{
      t('global.riffle')
    }}</span>
    :
    {{ riffle.factory.name }}
    {{ riffle.name }}
  </h2>

  <div class="p-6 mt-6" v-if="riffle">
    <Tabs value="0">
      <TabList>
        <Tab value="0">{{ t('global.importantInformation') }}</Tab>
        <Tab value="1">{{ t('global.barrelInformation') }}</Tab>
        <Tab value="2">{{ t('global.otherInformation') }}</Tab>
        <Tab value="3">{{ t('global.description') }}</Tab>
        <Tab value="4">{{ t('global.associatedProducts') }}</Tab>
        <Tab value="5">{{ t('global.price') }}</Tab>
        <Tab value="6">{{ t('global.stock') }}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <TabCardComponent :props="importantInfo" v-if="importantInfo" />
        </TabPanel>
        <TabPanel value="1">
          <TabCardComponent :props="barrelInfo" v-if="barrelInfo" />
        </TabPanel>
        <TabPanel value="2">
          <TabCardComponent :props="otherProps" v-if="otherProps" />
        </TabPanel>
        <TabPanel value="3">
          <p>
            {{
              riffle.description && riffle.description.length > 0
                ? riffle.description
                : t('global.notRegistered')
            }}
          </p>
        </TabPanel>
        <TabPanel value="4">
          <p>// Feature</p>
        </TabPanel>
        <TabPanel value="5">
          <tab-price-component :id="id" type="RIFFLE" :price="riffle.priceHistory" />
        </TabPanel>
        <TabPanel value="6">
          <tab-stock-component :stock="riffle.stock" />
        </TabPanel>
      </TabPanels>
    </Tabs>
    <audit-info-component
      :created-by="riffle.createdBy"
      :updated-by="riffle.updatedBy"
      :created-at="riffle.createdAt"
      :update-at="riffle.updatedAt"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRiffleStore } from '@/stores/riffle.store'
import { computed } from 'vue'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import TabCardComponent from '@/components/__tabs/TabCardComponent.vue'
import {
  BooleanFormatter,
  NumberFormatter,
  TriggerValueFormatter,
  VerifyFieldIsNotNull
} from '@/shared/utils/formatter.utils'

import AuditInfoComponent from '@/components/__detail/AuditInfoComponent.vue'
import TabPriceComponent from '@/components/__tabs/TabPriceComponent.vue'
import TabStockComponent from '@/components/__tabs/TabStockComponent.vue'

const { t } = useI18n()
const store = useRiffleStore()
const { id } = defineProps<{
  id: string
}>()
const { data: riffle } = store.getRiffleById(id)

const importantInfo = computed(() => {
  if (!riffle.value) return undefined
  return [
    {
      label: t('global.category'),
      title: riffle.value.category.name
    },
    {
      label: t('global.caliber'),
      title: riffle.value.caliber.name
    },
    {
      label: t('global.factory'),
      title: riffle.value.factory.name
    },
    {
      label: t('global.model'),
      title: riffle.value.name
    },
    {
      label: t('global.variation'),
      title: VerifyFieldIsNotNull(riffle.value.variation)
    },
    {
      label: t('weapon.weaponType'),
      title: riffle.value.type.name
    },
    {
      label: t('weapon.weaponTypeMode'),
      title: riffle.value.type.mode.name
    },
    {
      label: t('weapon.providedMagazineQuantity'),
      title: riffle.value.providedMagazineQuantity
    }
  ]
})

const barrelInfo = computed(() => {
  if (!riffle.value) return undefined
  return [
    {
      label: t('weapon.percussionType'),
      title: riffle.value.percussionType.name
    },
    {
      label: t('weapon.barrelLength'),
      title: `${riffle.value.barrelLength} cm (${(riffle.value.barrelLength / 2.54).toFixed()} ${t('global.inches')})`
    },
    {
      label: t('weapon.barrelSize'),
      title: NumberFormatter(riffle.value.barrelSize, 'mm')
    },
    {
      label: t('weapon.isThreadedBarrel'),
      title: BooleanFormatter(riffle.value.isThreadedBarrel)
    },
    {
      label: t('global.threadedSize'),
      title: VerifyFieldIsNotNull(riffle.value.threadedSize?.size)
    },
    {
      label: t('weapon.barrelType'),
      title: riffle.value.barrelType.name
    },
    {
      label: t('weapon.barrelColor'),
      title: VerifyFieldIsNotNull(riffle.value.barrelColor?.name)
    }
  ]
})

const otherProps = computed(() => {
  if (!riffle.value) return undefined
  return [
    {
      label: t('weapon.isAdjustableTrigger'),
      title:
        BooleanFormatter(riffle.value.isAdjustableTrigger) +
        ' ' +
        TriggerValueFormatter(
          riffle.value.adjustableTriggerMinWeight,
          riffle.value.adjustableTriggerMaxWeight,
          riffle.value.isAdjustableTrigger
        )
    },
    {
      label: t('weapon.buttMaterial'),
      title: VerifyFieldIsNotNull(riffle.value.buttMaterial?.name)
    },

    {
      label: t('weapon.buttColor'),
      title: VerifyFieldIsNotNull(riffle.value.buttColor?.name)
    },

    {
      label: t('weapon.isAdjustableButt'),
      title: BooleanFormatter(riffle.value.isAdjustableButt)
    },
    {
      label: t('weapon.isAdjustableBusk'),
      title: BooleanFormatter(riffle.value.isAdjustableBusk)
    },
    {
      label: t('weapon.isOpenAim'),
      title: BooleanFormatter(riffle.value.isOpenAim)
    },
    {
      label: t('weapon.isAdjustableBackSight'),
      title: BooleanFormatter(riffle.value.isAdjustableBackSight)
    },
    {
      label: t('weapon.isAdjustableFrontSight'),
      title: BooleanFormatter(riffle.value.isAdjustableFrontSight)
    },
    {
      label: t('weapon.qcSlot'),
      title: riffle.value.qcSlot
    },
    {
      label: t('weapon.grenadierSlot'),
      title: riffle.value.grenadierSlot
    },
    {
      label: t('weapon.isMlockCompatibility'),
      title: BooleanFormatter(riffle.value.isMlockCompatibility)
    }
  ]
})
/*const priceInfo = computed(() => {
  if (!riffle.value || !riffle.value.priceHistory) return undefined
  return [
    {
      label: t('priceHistory.supplierPrice'),
      title: NumberFormatter(riffle.value.priceHistory.supplierPrice, 'euro')
    },
    {
      label: t('priceHistory.recommendedSalePrice'),
      title: NumberFormatter(riffle.value.priceHistory.recommendedSalePrice, 'euro')
    },
    {
      label: t('priceHistory.currentSalePrice'),
      title: NumberFormatter(riffle.value.priceHistory.currentSalePrice, 'euro')
    }
  ]
})*/
</script>

<style scoped></style>
