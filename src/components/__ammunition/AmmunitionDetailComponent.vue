<template>
  <h2 class="text-2xl font-bold mb-4 text-center mt-10" v-if="ammo">
    <span class="text-blue-500">{{ t('global.ammunition') }}</span> : {{ ammo.factory.name }} -
    {{ ammo.name }}
  </h2>

  <div class="p-6 max-w-md mt-6" v-if="ammo">
    <Tabs value="0">
      <TabList>
        <Tab value="0">{{ t('global.importantInformation') }}</Tab>
        <Tab value="1">{{ t('global.price') }}</Tab>
        <Tab value="2">{{ t('global.description') }}</Tab>
        <Tab value="3">{{ t('global.associatedProducts') }}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <TabCardComponent :props="importantInfo" v-if="importantInfo" />
        </TabPanel>
        <TabPanel value="1">
          <TabCardComponent :props="priceInfo" v-if="priceInfo" />
        </TabPanel>
        <TabPanel value="2">
          <p>
            {{
              ammo.description && ammo.description.length > 0
                ? ammo.description
                : t('global.notRegistered')
            }}
          </p>
        </TabPanel>
        <TabPanel value="3">
          <p>// Feature</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { useAmmunitionStore } from '@/stores/ammunition.store'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { NumberFormatter } from '@/shared/utils/formatter.utils'
import TabPanels from 'primevue/tabpanels'
import Tab from 'primevue/tab'
import TabCardComponent from '@/components/__tabs/TabCardComponent.vue'
import TabList from 'primevue/tablist'
import Tabs from 'primevue/tabs'
import TabPanel from 'primevue/tabpanel'

const { id } = defineProps<{
  id: string
}>()
const store = useAmmunitionStore()

const { t } = useI18n()

const { data: ammo } = store.getById(id)
const importantInfo = computed(() => {
  if (!ammo.value) return undefined
  return [
    {
      label: t('global.category'),
      title: ammo.value.category.name
    },
    {
      label: t('global.caliber'),
      title: ammo.value.caliber.name
    },
    {
      label: t('global.factory'),
      title: ammo.value.factory.name
    },
    {
      label: t('global.model'),
      title: ammo.value.name
    },
    {
      label: t('weapon.percussionType'),
      title: ammo.value.percussionType.name
    },
    {
      label: t('ammunition.headType'),
      title: ammo.value.headType.name
    },
    {
      label: t('ammunition.bodyType'),
      title: ammo.value.bodyType.name
    },
    {
      label: t('ammunition.initialSpeed'),
      title: NumberFormatter(ammo.value.initialSpeed, 'speed')
    },
    {
      label: t('ammunition.packaging'),
      title: NumberFormatter(ammo.value.packaging, 'pcs')
    },
    {
      label: t('global.reference'),
      title: ammo.value.reference
    }
  ]
})
const priceInfo = computed(() => {
  if (!ammo.value || !ammo.value.priceHistory) return undefined
  return [
    {
      label: t('priceHistory.supplierPrice'),
      title: NumberFormatter(ammo.value.priceHistory.supplierPrice, 'euro')
    },
    {
      label: t('priceHistory.recommendedSalePrice'),
      title: NumberFormatter(ammo.value.priceHistory.recommendedSalePrice, 'euro')
    },
    {
      label: t('priceHistory.currentSalePrice'),
      title: NumberFormatter(ammo.value.priceHistory.currentSalePrice, 'euro')
    }
  ]
})
</script>

<style scoped></style>
