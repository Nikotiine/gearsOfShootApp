<template>
  <div class="" v-if="data && isSuccess">
    <h2 class="text-2xl font-bold mb-4 text-blue-500 text-center mt-10">
      <span class="text-white">{{ t(i18nPrefix + 'detailTitle') }}</span> :
      {{ data.factory.name }} -
      {{ data.name }}
    </h2>

    <div class="p-6 shadow-md rounded-lg max-w-md mt-6">
      <div class="space-y-4">
        <p>
          <span class="field-capitalise">{{ t(i18nPrefix + 'caliber') }}</span> :

          {{ data.caliber.name }}
        </p>

        <p>
          <span class="field-capitalise">{{ t(i18nPrefix + 'factory') }}</span> :
          {{ data.factory.name }}
        </p>

        <p>
          <span class="field-capitalise">{{ t(i18nPrefix + 'name') }}</span> :
          {{ data.name }}
        </p>

        <p>
          <span class="field-capitalise">{{ t(i18nPrefix + 'threadedSize') }}</span>
          :
          {{ data.threadedSize.size }}
        </p>

        <p>
          <span class="field-capitalise">{{ t(i18nPrefix + 'diameter') }}</span>
          :
          {{ data.diameter }}
        </p>
        <p>
          <span class="field-capitalise">{{ t(i18nPrefix + 'chicane') }}</span>
          :
          {{ data.chicane }}
        </p>

        <p>
          <span class="field-capitalise">{{ t(i18nPrefix + 'length') }}</span>
          :
          {{ data.length }} m/s
        </p>
        <p>
          <span class="field-capitalise">{{ t(i18nPrefix + 'estimatedNoiseReduction') }}</span>
          :
          {{ data.estimatedNoiseReduction }} db
        </p>
        <p>
          <span class="field-capitalise">{{ t(i18nPrefix + 'isCleanable') }}</span>
          :
          {{ data.isCleanable ? t(i18nPrefix + 'cleanable') : t(i18nPrefix + 'isNotCleanable') }}
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
const i18nPrefix = store.getI18NPrefix()
</script>

<style scoped></style>
