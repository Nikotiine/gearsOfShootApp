<template>
  <div class="" v-if="ammunition$?.data && isSuccess">
    <h2 class="text-2xl font-bold mb-4 text-blue-500 text-center mt-10">
      <span class="text-white">{{ t('global.ammunition') }}</span> :
      {{ ammunition$.data.factory.name }} -
      {{ ammunition$.data.name }}
    </h2>

    <div class="p-6 shadow-md rounded-lg max-w-md mt-6">
      <div class="space-y-4">
        <p>
          <span class="field-capitalise">{{ t('global.category') }}</span> :
          {{ ammunition$.data.category.name }}
        </p>

        <p>
          <span class="field-capitalise">{{ t('global.caliber') }}</span> :

          {{ ammunition$.data.caliber.name }}
        </p>

        <p>
          <span class="field-capitalise">{{ t('global.factory') }}</span> :
          {{ ammunition$.data.factory.name }}
        </p>

        <p>
          <span class="field-capitalise">{{ t('global.model') }}</span> :
          {{ ammunition$.data.name }}
        </p>

        <p>
          <span class="field-capitalise">{{ t('weapon.common.percussionType') }}</span>
          :
          {{ ammunition$.data.percussionType.name }}
        </p>

        <p>
          <span class="field-capitalise">{{ t('ammunition.form.headType') }}</span>
          :
          {{ ammunition$.data.headType.name }}
        </p>
        <p>
          <span class="field-capitalise">{{ t('ammunition.form.bodyType') }}</span>
          :
          {{ ammunition$.data.bodyType.name }}
        </p>

        <p>
          <span class="field-capitalise">{{ t('ammunition.form.initialSpeed') }}</span>
          :
          {{ ammunition$.data.initialSpeed }} m/s
        </p>
        <p>
          <span class="field-capitalise">{{ t('ammunition.form.packaging') }}</span>
          :
          {{ ammunition$.data.packaging }}
          {{ ammunition$.data.packaging > 1 ? t('global.pieces') : t('global.piece') }}
        </p>

        <p>
          <span class="field-capitalise">{{ t('global.reference') }}</span>
          :
          {{ ammunition$.data.reference }}
        </p>

        <p v-if="ammunition$.data.description">
          <span class="field-capitalise">{{ t('global.description') }}</span>
          :{{ ammunition$?.data.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAmmunitionStore } from '@/stores/ammunition'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { id } = defineProps<{
  id: string
}>()
const store = useAmmunitionStore()
const { t } = useI18n()
const ammunitionId = ref<number>(parseInt(id))
const { data: ammunition$, isSuccess } = store.getById(ammunitionId)
</script>

<style scoped></style>
