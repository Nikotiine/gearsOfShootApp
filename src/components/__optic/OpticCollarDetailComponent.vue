<template>
  <h2 class="text-2xl font-bold mb-4 text-blue-500 text-center mt-10">
    <span class="text-white">{{ t('global.collar') }}</span> : {{ collar.factory.name }}
    {{ collar.reference }}
  </h2>
  <div class="p-6 shadow-md rounded-lg max-w-md mt-6">
    <div class="space-y-4">
      <p>
        <span class="field-capitalise">{{ t('global.name') }}</span> :
        {{ collar.name }}
      </p>
      <p>
        <span class="field-capitalise">{{ t('global.diameter') }}</span> :
        {{ collar.diameter }}
      </p>
      <p>
        <span class="field-capitalise">{{ t('global.factory') }}</span> :
        {{ collar.factory.name }}
      </p>
      <p>
        <span class="field-capitalise">{{ t('global.height') }}</span> :
        {{ collar.height }}
      </p>
      <p>
        <span class="field-capitalise">{{ t('global.opticRail') }}</span> :
        {{ collar.railSize.name }}
      </p>
      <p v-if="collar.description.length > 0">
        <span class="field-capitalise">{{ t('global.description') }}</span>
        :{{ collar.description }}
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { OpticCollarDto } from '@/api/Api'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const { collar } = defineProps<{
  collar: OpticCollarDto
}>()
</script>

<style scoped></style>
