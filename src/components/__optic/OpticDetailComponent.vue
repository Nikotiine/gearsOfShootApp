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
          <Tab value="1">{{ t('global.description') }}</Tab>
          <Tab value="2">{{ t('global.associatedProducts') }}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="0">
            <TabCardComponent :props="importantInfo" v-if="importantInfo" />
          </TabPanel>
          <TabPanel value="1">
            <p>
              {{
                optic.description && optic.description.length > 0
                  ? optic.description
                  : t('global.notRegistered')
              }}
            </p>
          </TabPanel>
          <TabPanel value="2">
            <p>// Feature</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <!--      <div class="space-y-4">
        <p>
          <span class="field-capitalise">{{ t('global.category') }}</span> : {{ data.minZoom }} -
          {{ data.maxZoom }} X {{ data.lensDiameter }}
        </p>

        <p>
          <span class="field-capitalise">{{ t('optic.bodyDiameter') }}</span> :

          {{ data.bodyDiameter }}
        </p>

        <p>
          <span class="field-capitalise">{{ t('global.factory') }}</span> :
          {{ data.factory.name }}
        </p>

        <p>
          <span class="field-capitalise">{{ t('global.model') }}</span> :
          {{ data.name }}
        </p>

        <p>
          <span class="field-capitalise">{{ t('optic.focalPlane') }}</span>
          :
          {{ data.focalPlane.name }}
        </p>
        <p>
          <span class="field-capitalise">{{ t('global.length') }}</span>
          :
          {{ data.length }}
        </p>
        <p>
          <span class="field-capitalise">{{ t('optic.maxElevation') }}</span>
          :
          {{ data.maxElevation }}
        </p>
        <p>
          <span class="field-capitalise">{{ t('optic.maxDrift') }}</span>
          :
          {{ data.maxDrift }}
        </p>

        <p>
          <span class="field-capitalise">{{ t('optic.opticUnit') }}</span>
          :
          {{ data.opticUnit.name }}
        </p>
        <p>
          <span class="field-capitalise">{{ t('optic.clickValue') }}</span>
          :
          {{ data.valueOfOneClick }}
        </p>
        <p>
          <span class="field-capitalise">{{ t('optic.eyeRelief') }}</span>
          :
          {{ data.eyeRelief }}
        </p>

        <p>
          <span class="field-capitalise">{{ t('global.reference') }}</span>
          {{ data.reference }}
        </p>

        <p v-if="data.description">
          <span class="field-capitalise">{{ t('global.description') }}</span>
          :{{ data.description }}
        </p>
      </div>-->
    </div>
  </div>
</template>
<script setup lang="ts">
import { useOpticStore } from '@/stores/optic'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { NumberFormatter, ZoomFormatter } from '@/shared/utils/formatter.utils'
import TabPanels from 'primevue/tabpanels'
import Tab from 'primevue/tab'
import TabCardComponent from '@/components/__tabs/TabCardComponent.vue'
import TabList from 'primevue/tablist'
import Tabs from 'primevue/tabs'
import TabPanel from 'primevue/tabpanel'

const { t } = useI18n()
const store = useOpticStore()
const { id } = defineProps<{
  id: string
}>()

const { data: optic, isSuccess } = store.getById(id)
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
      title: optic.value.focalPlane.name
    },
    {
      label: t('optic.denomination'),
      title: ZoomFormatter(optic.value.minZoom, optic.value.maxZoom, optic.value.lensDiameter)
    },
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
    }
  ]
})
</script>

<style scoped></style>
