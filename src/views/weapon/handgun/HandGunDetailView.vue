<template>
  <h2 class="text-2xl font-bold mb-4 text-center mt-10" v-if="handgun">
    <span class="field-capitalise-underlined-semi-bold text-blue-500">{{
      t('global.handgun')
    }}</span>
    :
    {{ handgun.factory.name }}
    {{ handgun.name }}
  </h2>

  <div class="p-6 mt-6" v-if="handgun">
    <Tabs value="0" scrollable class="min-h-100vh">
      <TabList>
        <Tab value="0">{{ t('global.importantInformation') }}</Tab>
        <Tab value="1">{{ t('global.barrelInformation') }}</Tab>
        <Tab value="2">{{ t('global.otherInformation') }}</Tab>
        <Tab value="3">{{ t('global.description') }}</Tab>
        <Tab value="4">{{ t('global.associatedProducts') }}</Tab>
        <Tab value="5" v-if="$route.meta.admin">{{ t('global.price') }}</Tab>
        <Tab value="6" v-if="$route.meta.admin">{{ t('global.stock') }}</Tab>
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
              handgun.description && handgun.description.length > 0
                ? handgun.description
                : t('global.notRegistered')
            }}
          </p>
        </TabPanel>
        <TabPanel value="4">
          <p>// Feature</p>
        </TabPanel>
        <TabPanel value="5" v-if="$route.meta.admin">
          <tab-price-component :id="id" type="HANDGUN" :price="handgun.priceHistory" />
        </TabPanel>
        <TabPanel value="6" v-if="$route.meta.admin">
          <tab-stock-component :stock="handgun.stock" />
        </TabPanel>
      </TabPanels>
    </Tabs>
    <audit-info-component
      :created-by="handgun.createdBy"
      :updated-by="handgun.updatedBy"
      :created-at="handgun.createdAt"
      :update-at="handgun.updatedAt"
    />
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useHandGunStore } from '@/stores/hand-gun.store'
import TabCardComponent from '@/components/__tabs/TabCardComponent.vue'
import Tabs from 'primevue/tabs'
import Tab from 'primevue/tab'
import TabList from 'primevue/tablist'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import { computed } from 'vue'
import {
  BooleanFormatter,
  NumberFormatter,
  TriggerValueFormatter,
  VerifyFieldIsNotNull
} from '@/shared/utils/formatter.utils'

import AuditInfoComponent from '@/components/__detail/AuditInfoComponent.vue'
import TabStockComponent from '@/components/__tabs/TabStockComponent.vue'
import TabPriceComponent from '@/components/__tabs/TabPriceComponent.vue'

const store = useHandGunStore()

const { t } = useI18n()
const { id } = defineProps<{
  id: string
}>()
const i18nPrefix = store.getI18NPrefix
const { data: handgun } = store.getHandGunById(id)

const importantInfo = computed(() => {
  if (!handgun.value) return undefined
  return [
    {
      label: t('global.category'),
      title: handgun.value.category.name
    },
    {
      label: t('global.caliber'),
      title: handgun.value.caliber.name
    },
    {
      label: t('global.factory'),
      title: handgun.value.factory.name
    },
    {
      label: t('global.model'),
      title: handgun.value.name
    },
    {
      label: t('global.variation'),
      title: VerifyFieldIsNotNull(handgun.value.variation)
    },
    {
      label: t(i18nPrefix + 'weaponType'),
      title: handgun.value.type.name
    },
    {
      label: t(i18nPrefix + 'weaponTypeMode'),
      title: handgun.value.type.mode.name
    },
    {
      label: t(i18nPrefix + 'providedMagazineQuantity'),
      title: handgun.value.providedMagazineQuantity
    },
    {
      label: t(i18nPrefix + 'triggerType'),
      title: VerifyFieldIsNotNull(handgun.value.triggerType?.name)
    }
  ]
})

const barrelInfo = computed(() => {
  if (!handgun.value) return undefined
  return [
    {
      label: t(i18nPrefix + 'percussionType'),
      title: handgun.value.percussionType.name
    },
    {
      label: t(i18nPrefix + 'barrelLength'),
      title: `${handgun.value.barrelLength} cm (${(handgun.value.barrelLength / 2.54).toFixed()} ${t('global.inches')})`
    },
    {
      label: t(i18nPrefix + 'barrelSize'),
      title: NumberFormatter(handgun.value.barrelSize, 'mm')
    },
    {
      label: t(i18nPrefix + 'isThreadedBarrel'),
      title: BooleanFormatter(handgun.value.isThreadedBarrel)
    },
    {
      label: t('global.threadedSize'),
      title: VerifyFieldIsNotNull(handgun.value.threadedSize?.size)
    },
    {
      label: t(i18nPrefix + 'barrelType'),
      title: handgun.value.barrelType.name
    },
    {
      label: t(i18nPrefix + 'barrelColor'),
      title: VerifyFieldIsNotNull(handgun.value.barrelColor?.name)
    },
    {
      label: t(i18nPrefix + 'slideColor'),
      title: VerifyFieldIsNotNull(handgun.value.slideColor?.name)
    },
    {
      label: t(i18nPrefix + 'slideMaterial'),
      title: VerifyFieldIsNotNull(handgun.value.slideMaterial?.name)
    }
  ]
})
const otherProps = computed(() => {
  if (!handgun.value) return undefined
  return [
    {
      label: t(i18nPrefix + 'isAdjustableTrigger'),
      title:
        BooleanFormatter(handgun.value.isAdjustableTrigger) +
        TriggerValueFormatter(
          handgun.value.adjustableTriggerMinWeight,
          handgun.value.adjustableTriggerMaxWeight,
          handgun.value.isAdjustableTrigger
        )
    },
    {
      label: t(i18nPrefix + 'buttMaterial'),
      title: VerifyFieldIsNotNull(handgun.value.buttMaterial?.name)
    },

    {
      label: t(i18nPrefix + 'buttColor'),
      title: VerifyFieldIsNotNull(handgun.value.buttColor?.name)
    },
    /* TODO: Mettre visée ouverte en bdd
 {
      label: t(i18nPrefix +'isOpenAim'),
      title: BooleanFormatter(handgun.value.isOpenAim)
    },*/
    {
      label: t(i18nPrefix + 'isAdjustableBackSight'),
      title: BooleanFormatter(handgun.value.isAdjustableBackSight)
    },
    {
      label: t(i18nPrefix + 'isAdjustableFrontSight'),
      title: BooleanFormatter(handgun.value.isAdjustableFrontSight)
    },
    {
      label: t(i18nPrefix + 'decocking'),
      title: BooleanFormatter(handgun.value.decocking)
    },
    {
      label: t(i18nPrefix + 'isOpticReady'),
      title: BooleanFormatter(handgun.value.isOpticReady)
    },
    {
      label: t(i18nPrefix + 'isPicatinyRailSlop'),
      title: BooleanFormatter(handgun.value.isPicatinyRailSlop)
    },
    {
      label: t(i18nPrefix + 'isExternalHammer'),
      title: BooleanFormatter(handgun.value.isExternalHammer)
    }
  ]
})
</script>

<style scoped>
.min-h-100vh {
  min-height: 100vh;
}
</style>
