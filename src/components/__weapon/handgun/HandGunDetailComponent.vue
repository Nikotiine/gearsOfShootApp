<template>
  <h2 class="text-2xl font-bold mb-4 text-blue-500 text-center mt-10" v-if="handgun">
    <span class="field-capitalise-underlined-semi-bold text-white">{{ t('global.handgun') }}</span>
    :
    {{ handgun.factory.name }}
    {{ handgun.name }}
  </h2>

  <div class="p-6 shadow-md rounded-lg max-w-md mt-6" v-if="handgun">
    <Tabs value="0">
      <TabList>
        <Tab value="0">{{ t('global.importantInformation') }}</Tab>
        <Tab value="1">{{ t('global.barrelInformation') }}</Tab>
        <Tab value="2">{{ t('global.otherInformation') }}</Tab>
        <Tab value="3">{{ t('global.description') }}</Tab>
        <Tab value="4">{{ t('global.associatedProducts') }}</Tab>
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
            {{ handgun.description.length > 0 ? handgun.description : t('global.notRegistered') }}
          </p>
        </TabPanel>
        <TabPanel value="4">
          <p>// Feature</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useHandGunStore } from '@/stores/hand-gun'
import TabCardComponent from '@/components/__weapon/shared/TabCardComponent.vue'
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
const store = useHandGunStore()
const { t } = useI18n()
const { id } = defineProps<{
  id: string
}>()
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
      title: handgun.value.factory.name
    },
    {
      label: t('weapon.weaponType'),
      title: handgun.value.type.name
    },
    {
      label: t('weapon.weaponTypeMode'),
      title: handgun.value.type.mode.name
    },
    {
      label: t('weapon.providedMagazineQuantity'),
      title: handgun.value.providedMagazineQuantity
    },
    {
      label: t('weapon.triggerType'),
      title: VerifyFieldIsNotNull(handgun.value.triggerType?.name)
    }
  ]
})

const barrelInfo = computed(() => {
  if (!handgun.value) return undefined
  return [
    {
      label: t('weapon.percussionType'),
      title: handgun.value.percussionType.name
    },
    {
      label: t('weapon.barrelLength'),
      title: `${handgun.value.barrelLength} cm (${(handgun.value.barrelLength / 2.54).toFixed()} ${t('global.inches')})`
    },
    {
      label: t('weapon.barrelSize'),
      title: NumberFormatter(handgun.value.barrelSize, 'mm')
    },
    {
      label: t('weapon.isThreadedBarrel'),
      title: BooleanFormatter(handgun.value.isThreadedBarrel)
    },
    {
      label: t('global.threadedSize'),
      title: VerifyFieldIsNotNull(handgun.value.threadedSize?.size)
    },
    {
      label: t('weapon.barrelType'),
      title: handgun.value.barrelType.name
    },
    {
      label: t('weapon.barrelColor'),
      title: VerifyFieldIsNotNull(handgun.value.barrelColor?.name)
    },
    {
      label: t('weapon.slideColor'),
      title: VerifyFieldIsNotNull(handgun.value.slideColor?.name)
    },
    {
      label: t('weapon.slideMaterial'),
      title: VerifyFieldIsNotNull(handgun.value.slideMaterial?.name)
    }
  ]
})
const otherProps = computed(() => {
  if (!handgun.value) return undefined
  return [
    {
      label: t('weapon.isAdjustableTrigger'),
      title:
        BooleanFormatter(handgun.value.isAdjustableTrigger) +
        TriggerValueFormatter(
          handgun.value.adjustableTriggerMinWeight,
          handgun.value.adjustableTriggerMaxWeight,
          handgun.value.isAdjustableTrigger
        )
    },
    {
      label: t('weapon.buttMaterial'),
      title: VerifyFieldIsNotNull(handgun.value.buttMaterial?.name)
    },

    {
      label: t('weapon.buttColor'),
      title: VerifyFieldIsNotNull(handgun.value.buttColor?.name)
    },
    /* TODO: Mettre vidée ouverte en bdd
 {
      label: t('weapon.isOpenAim'),
      title: BooleanFormatter(handgun.value.isOpenAim)
    },*/
    {
      label: t('weapon.isAdjustableBackSight'),
      title: BooleanFormatter(handgun.value.isAdjustableBackSight)
    },
    {
      label: t('weapon.isAdjustableFrontSight'),
      title: BooleanFormatter(handgun.value.isAdjustableFrontSight)
    },
    {
      label: t('weapon.decocking'),
      title: BooleanFormatter(handgun.value.decocking)
    },
    {
      label: t('weapon.isOpticReady'),
      title: BooleanFormatter(handgun.value.isOpticReady)
    },
    {
      label: t('weapon.isPicatinyRailSlop'),
      title: BooleanFormatter(handgun.value.isPicatinyRailSlop)
    },
    {
      label: t('weapon.isExternalHammer'),
      title: BooleanFormatter(handgun.value.isExternalHammer)
    }
  ]
})
</script>

<style scoped></style>
