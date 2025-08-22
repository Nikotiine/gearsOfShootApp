<template>
  <div class="" v-if="optic">
    <h2 class="text-2xl font-bold mb-4 text-center mt-10">
      <span class="text-blue-500">{{ t('global.optic') }}</span> : {{ optic.factory.name }} -
      {{ optic.name }}
    </h2>

    <div class="p-6 max-w-md mt-6" v-if="optic">
      <Tabs value="0">
        <TabList>
          <Tab value="0">{{ t('global.importantInformation') }}</Tab>
          <Tab value="1">{{ t('global.otherInformation') }}</Tab>
          <Tab value="2">{{ t('global.price') }}</Tab>
          <Tab value="3">{{ t('global.description') }}</Tab>
          <Tab value="4">{{ t('global.associatedProducts') }}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="0">
            <TabCardComponent :props="importantInfo" v-if="importantInfo" />
          </TabPanel>
          <TabPanel value="1">
            <TabCardComponent :props="otherInformation" v-if="otherInformation" />
          </TabPanel>
          <TabPanel value="2">
            <TabCardComponent :props="priceInfo" v-if="priceInfo" />
          </TabPanel>
          <TabPanel value="3">
            <p>
              {{
                optic.description && optic.description.length > 0
                  ? optic.description
                  : t('global.notRegistered')
              }}
            </p>
          </TabPanel>
          <TabPanel value="4">
            <p>// Feature</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <audit-info-component
        :created-by="optic.createdBy"
        :updated-by="optic.updatedBy"
        :created-at="optic.createdAt"
        :update-at="optic.updatedAt"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useOpticStore } from '@/stores/optic.store'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import {
  BooleanFormatter,
  FocalPlaneFormatter,
  NumberFormatter,
  ParallaxFormatter,
  ZoomFormatter
} from '@/shared/utils/formatter.utils'
import TabPanels from 'primevue/tabpanels'
import Tab from 'primevue/tab'
import TabCardComponent from '@/components/__tabs/TabCardComponent.vue'
import TabList from 'primevue/tablist'
import Tabs from 'primevue/tabs'
import TabPanel from 'primevue/tabpanel'
import AuditInfoComponent from '@/components/__detail/AuditInfoComponent.vue'

const { t } = useI18n()
const store = useOpticStore()
const { id } = defineProps<{
  id: string
}>()

const { data: optic } = store.getById(id)
const importantInfo = computed(() => {
  if (!optic.value) return undefined
  return [
    {
      label: t('global.factory'),
      title: optic.value.factory.name
    },
    {
      label: t('global.model'),
      title: optic.value.name
    },
    {
      label: t('optic.focalPlane'),
      title: FocalPlaneFormatter(optic.value.focalPlane)
    },
    {
      label: t('optic.denomination'),
      title: ZoomFormatter(optic.value.minZoom, optic.value.maxZoom, optic.value.lensDiameter)
    },
    {
      label: t('optic.opticType'),
      title: optic.value.opticType.name
    },
    {
      label: t('global.reference'),
      title: optic.value.reference
    }
  ]
})
const otherInformation = computed(() => {
  if (!optic.value) return undefined
  return [
    {
      label: t('optic.opticUnit'),
      title: optic.value.opticUnit.name
    },
    {
      label: t('optic.clickValue'),
      title: optic.value.valueOfOneClick
    },
    {
      label: t('global.length'),
      title: NumberFormatter(optic.value.length, 'cm')
    },
    {
      label: t('optic.bodyDiameter'),
      title: NumberFormatter(optic.value.bodyDiameter, 'mm')
    },
    {
      label: t('optic.lensDiameter'),
      title: NumberFormatter(optic.value.lensDiameter, 'mm')
    },
    {
      label: t('optic.maxElevation'),
      title: NumberFormatter(optic.value.maxElevation, 'moa')
    },
    {
      label: t('optic.maxDrift'),
      title: NumberFormatter(optic.value.maxDrift, 'moa')
    },
    {
      label: t('optic.minZoom'),
      title: optic.value.minZoom
    },
    {
      label: t('optic.maxZoom'),
      title: optic.value.maxZoom
    },
    {
      label: t('optic.isParallax'),
      title: ParallaxFormatter(
        optic.value.isParallax,
        optic.value.minParallax,
        optic.value.maxParallax
      )
    },
    {
      label: t('optic.eyeRelief'),
      title: NumberFormatter(optic.value.eyeRelief, 'cm')
    },
    {
      label: t('optic.isCollarsProvided'),
      title: BooleanFormatter(optic.value.isCollarsProvided)
    },
    {
      label: t('optic.isCollarsProvided'),
      title:
        optic.value.isCollarsProvided && optic.value.providedOpticCollarSize
          ? optic.value.providedOpticCollarSize.name
          : t('optic.noCollarsProvided')
    }
  ]
})
const priceInfo = computed(() => {
  if (!optic.value || !optic.value.priceHistory) return undefined
  return [
    {
      label: t('priceHistory.supplierPrice'),
      title: NumberFormatter(optic.value.priceHistory.supplierPrice, 'euro')
    },
    {
      label: t('priceHistory.recommendedSalePrice'),
      title: NumberFormatter(optic.value.priceHistory.recommendedSalePrice, 'euro')
    },
    {
      label: t('priceHistory.currentSalePrice'),
      title: NumberFormatter(optic.value.priceHistory.currentSalePrice, 'euro')
    }
  ]
})
</script>

<style scoped></style>
