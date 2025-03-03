<template>
  <div class="text-red-500 text-3xl text-center" v-if="isError">
    {{ t('error.' + error?.response.data.message) }}
  </div>
  <div class="" v-if="data?.data && isSuccess">
    <h2 class="text-2xl font-bold mb-4 text-blue-500 text-center mt-10">
      <span class="text-white">{{ t('global.optic') }}</span> : {{ data.data.factory.name }} -
      {{ data.data.name }}
    </h2>

    <div class="p-6 shadow-md rounded-lg max-w-md mt-6">
      <div class="space-y-4">
        <p>
          <span class="field-capitalise">{{ t('global.category') }}</span> :
          {{ data.data.minZoom }} - {{ data.data.maxZoom }} X {{ data.data.lensDiameter }}
        </p>

        <p>
          <span class="field-capitalise">{{ t('optic.common.bodyDiameter') }}</span> :

          {{ data.data.bodyDiameter }}
        </p>

        <p>
          <span class="field-capitalise">{{ t('global.factory') }}</span> :
          {{ data.data.factory.name }}
        </p>

        <p>
          <span class="field-capitalise">{{ t('global.model') }}</span> :
          {{ data.data.name }}
        </p>

        <p>
          <span class="field-capitalise">{{ t('optic.common.focalPlane') }}</span>
          :
          {{ data.data.focalPlane.name }}
        </p>
        <p>
          <span class="field-capitalise">{{ t('global.length') }}</span>
          :
          {{ data.data.length }}
        </p>
        <p>
          <span class="field-capitalise">{{ t('optic.common.maxElevation') }}</span>
          :
          {{ data.data.maxElevation }}
        </p>
        <p>
          <span class="field-capitalise">{{ t('optic.common.maxDrift') }}</span>
          :
          {{ data.data.maxDrift }}
        </p>

        <p>
          <span class="field-capitalise">{{ t('optic.common.opticUnit') }}</span>
          :
          {{ data.data.opticUnit.name }}
        </p>
        <p>
          <span class="field-capitalise">{{ t('optic.common.clickValue') }}</span>
          :
          {{ data.data.valueOfOneClick }}
        </p>
        <p>
          <span class="field-capitalise">{{ t('optic.common.eyeRelief') }}</span>
          :
          {{ data.data.eyeRelief }}
        </p>

        <p>
          <span class="field-capitalise">{{ t('global.reference') }}</span>
          {{ data.data.reference }}
        </p>

        <p v-if="data.data.description">
          <span class="field-capitalise">{{ t('global.description') }}</span>
          :{{ data.data.description }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useOpticStore } from '@/stores/optic'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const store = useOpticStore()
const { id } = defineProps<{
  id: string
}>()
const opticId = ref<number>(parseInt(id))
const { data, isSuccess, isError, error } = store.getById(opticId)
</script>

<style scoped></style>
