<template>
  <div class="" v-if="data && isSuccess">
    <h2 class="text-2xl font-bold mb-4 text-blue-500 text-center mt-10">
      <span class="text-white">{{ t('global.ammunition') }}</span> : {{ data.factory.name }} -
      {{ data.name }}
    </h2>

    <div class="p-6 shadow-md rounded-lg max-w-md mt-6">
      <div class="space-y-4">
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
          {{ data.threadedSize.size }}
        </p>

        <p>
          <span class="field-capitalise">{{ t('ammunition.headType') }}</span>
          :
          {{ data.diameter }}
        </p>
        <p>
          <span class="field-capitalise">{{ t('ammunition.bodyType') }}</span>
          :
          {{ data.chicane }}
        </p>

        <p>
          <span class="field-capitalise">{{ t('ammunition.initialSpeed') }}</span>
          :
          {{ data.length }} m/s
        </p>
        <p>
          <span class="field-capitalise">{{ t('ammunition.packaging') }}</span>
          :
          {{ data.estimatedNoiseReduction }}
        </p>
        <p>
          <span class="field-capitalise">{{ t('ammunition.packaging') }}</span>
          :
          {{ data.isCleanable ? 'Demontable' : 'non demo table' }}
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
import { useSoundReducerStore } from '@/stores/sound-noise-reducer'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const { id } = defineProps<{
  id: string
}>()
const store = useSoundReducerStore()
const { data, isSuccess } = store.getById(id)
</script>

<style scoped></style>
