<template>
  <div class="" v-if="data && isSuccess">
    <h2 class="text-2xl font-bold mb-4 text-blue-500 text-center mt-10">
      <span class="text-white">{{ t('global.ammunition') }}</span> : {{ data.factory.name }} -
      {{ data.name }}
    </h2>

    <div class="p-6 shadow-md rounded-lg max-w-md mt-6">
      <div class="space-y-4">
        <p>
          <span class="field-capitalise">{{ t('global.category') }}</span> :
          {{ data.category.name }}
        </p>

        <p>
          <span class="field-capitalise">{{ t('global.caliber') }}</span> :

          {{ data.caliber.name }}
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
          <span class="field-capitalise">{{ t('weapon.common.percussionType') }}</span>
          :
          {{ data.percussionType.name }}
        </p>

        <p>
          <span class="field-capitalise">{{ t('ammunition.headType') }}</span>
          :
          {{ data.headType.name }}
        </p>
        <p>
          <span class="field-capitalise">{{ t('ammunition.bodyType') }}</span>
          :
          {{ data.bodyType.name }}
        </p>

        <p>
          <span class="field-capitalise">{{ t('ammunition.initialSpeed') }}</span>
          :
          {{ data.initialSpeed }} m/s
        </p>
        <p>
          <span class="field-capitalise">{{ t('ammunition.packaging') }}</span>
          :
          {{ data.packaging }}
          {{ data.packaging > 1 ? t('global.pieces') : t('global.piece') }}
        </p>

        <p>
          <span class="field-capitalise">{{ t('global.reference') }}</span>
          :
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
import { useAmmunitionStore } from '@/stores/ammunition'
import { useI18n } from 'vue-i18n'

const { id } = defineProps<{
  id: string
}>()
const store = useAmmunitionStore()
const { t } = useI18n()

const { data, isSuccess } = store.getById(id)
</script>

<style scoped></style>
