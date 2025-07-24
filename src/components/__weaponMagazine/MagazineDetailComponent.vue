<template>
  <h2 class="text-2xl font-bold mb-4 text-center mt-10" v-if="magazine">
    <span class="text-blue-500">{{ t('global.magazine') }}</span> : {{ magazine.factory.name }}
    {{ magazine.reference }}
  </h2>
  <div class="p-6 max-w-md mt-6" v-if="magazine">
    <Tabs value="0">
      <TabList>
        <Tab value="0">{{ t('global.importantInformation') }}</Tab>
        <Tab value="1">{{ t('global.description') }}</Tab>
        <Tab value="2">{{ t('global.associatedWeapons') }}</Tab>
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
        <TabPanel value="2">
          <TabCardComponent :props="associatedWeapons" v-if="associatedWeapons" />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useWeaponMagazineStore } from '@/stores/weapon-magazine.store'
import { computed } from 'vue'
import TabPanels from 'primevue/tabpanels'
import Tab from 'primevue/tab'
import TabCardComponent, { type TabCardProps } from '@/components/__tabs/TabCardComponent.vue'
import TabList from 'primevue/tablist'
import Tabs from 'primevue/tabs'
import TabPanel from 'primevue/tabpanel'
import { NumberFormatter } from '@/shared/utils/formatter.utils'
const store = useWeaponMagazineStore()
const { t } = useI18n()
const { id } = defineProps<{
  id: string
}>()
const { data: magazine } = store.getById(id)
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
const associatedWeapons = computed(() => {
  if (!magazine.value) return undefined
  let weapons: TabCardProps[] = []
  if (magazine.value.riffles) {
    weapons = magazine.value.riffles.map((riffle) => {
      return {
        label: t('global.model'),
        title: `${riffle.factory.name} ${riffle.name} ${riffle.variation ? '-' + riffle.variation : ''}`
      }
    })
  }
  if (magazine.value.riffles) {
    weapons = magazine.value.handguns.map((handgun) => {
      return {
        label: t('global.model'),
        title: `${handgun.factory.name} ${handgun.name} ${handgun.variation ? '-' + handgun.variation : ''} (${handgun.type.name})`
      }
    })
  }
  return weapons
})
</script>

<style scoped></style>
