<template>
  <h2 class="text-2xl font-bold mb-4 text-center mt-10" v-if="magazine">
    <span class="text-blue-500">{{ t('global.magazine') }}</span> : {{ magazine.factory.name }}
    {{ magazine.reference }}
  </h2>
  <div class="p-6 mt-6" v-if="magazine">
    <Tabs value="0">
      <TabList>
        <Tab value="0">{{ t('global.importantInformation') }}</Tab>
        <Tab value="1">{{ t('global.description') }}</Tab>
        <Tab value="2">{{ t('global.associatedWeapons') }}</Tab>
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
              magazine.description && magazine.description.length > 0
                ? magazine.description
                : t('global.notRegistered')
            }}
          </p>
        </TabPanel>
        <TabPanel value="2"> //FEATURE </TabPanel>
        <TabPanel value="3" v-if="$route.meta.admin">
          <tab-price-component :id="id" type="MAGAZINE" :price="magazine.priceHistory" />
        </TabPanel>
        <TabPanel value="4" v-if="$route.meta.admin">
          <tab-stock-component :stock="magazine.stock" />
        </TabPanel>
      </TabPanels>
    </Tabs>
    <audit-info-component
      :created-by="magazine.createdBy"
      :updated-by="magazine.updatedBy"
      :created-at="magazine.createdAt"
      :update-at="magazine.updatedAt"
      v-if="$route.meta.admin"
    />
  </div>
  <div class="flex justify-center">
    <add-to-cart-button :item="item" v-if="item" />
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useWeaponMagazineStore } from '@/stores/weapon-magazine.store'
import { computed } from 'vue'
import TabPanels from 'primevue/tabpanels'
import Tab from 'primevue/tab'
import TabCardComponent from '@/components/__tabs/TabCardComponent.vue'
import TabList from 'primevue/tablist'
import Tabs from 'primevue/tabs'
import TabPanel from 'primevue/tabpanel'
import { NumberFormatter } from '@/shared/utils/formatter.utils'
import AuditInfoComponent from '@/components/__detail/AuditInfoComponent.vue'
import TabPriceComponent from '@/components/__tabs/TabPriceComponent.vue'
import TabStockComponent from '@/components/__tabs/TabStockComponent.vue'
import AddToCartButton from '@/components/__cart/AddToCartButton.vue'

const store = useWeaponMagazineStore()
const { t } = useI18n()
const { id } = defineProps<{
  id: string
}>()
const { data: magazine } = store.getById(id)
const item = computed(() => {
  if (magazine.value) {
    return store.mapDtoToDataViewProps(magazine.value)
  }
  return null
})
const importantInfo = computed(() => {
  if (!magazine.value) return undefined
  return [
    {
      label: t('global.category'),
      title: magazine.value.category.name
    },
    {
      label: t('global.caliber'),
      title: magazine.value.caliber.name
    },
    {
      label: t('global.factory'),
      title: magazine.value.factory.name
    },
    {
      label: t('global.capacity'),
      title: NumberFormatter(magazine.value.capacity, 'cps')
    },
    {
      label: t('global.material'),
      title: magazine.value.body.name
    },
    {
      label: t('global.height'),
      title: NumberFormatter(magazine.value.height, 'cm')
    },
    {
      label: t('global.width'),
      title: NumberFormatter(magazine.value.width, 'cm')
    },
    {
      label: t('global.length'),
      title: NumberFormatter(magazine.value.length, 'cm')
    }
  ]
})
</script>

<style scoped></style>
