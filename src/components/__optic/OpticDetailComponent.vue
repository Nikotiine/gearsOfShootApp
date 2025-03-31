<template>
  <div class="text-red-500 text-3xl text-center" v-if="isError">
    {{ t('error.' + error?.response.data.message) }}
  </div>
  <div class="" v-if="data && isSuccess">
    <h2 class="text-2xl font-bold mb-4 text-blue-500 text-center mt-10">
      <span class="text-white">{{ t('global.optic') }}</span> : {{ data.factory.name }} -
      {{ data.name }}
    </h2>

    <div class="p-6 shadow-md rounded-lg max-w-md mt-6">
      <div class="space-y-4">
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
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useOpticStore } from '@/stores/optic'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const store = useOpticStore()
const { id } = defineProps<{
  id: string
}>()

const { data, isSuccess, isError, error } = store.getById(id)
</script>

<style scoped></style>
