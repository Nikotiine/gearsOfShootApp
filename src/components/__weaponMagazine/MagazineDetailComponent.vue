<template>
  <h2 class="text-2xl font-bold mb-4 text-blue-500 text-center mt-10">
    <span class="text-white">{{ t('global.magazine') }}</span> : {{ magazine.factory.name }}
    {{ magazine.reference }}
  </h2>
  <div class="p-6 shadow-md rounded-lg max-w-md mt-6">
    <div class="space-y-4">
      <p>
        <span class="field-capitalise">{{ t('global.category') }}</span> :
        {{ magazine.category.name }}
      </p>
      <p>
        <span class="field-capitalise">{{ t('global.caliber') }}</span> :
        {{ magazine.caliber.name }}
      </p>
      <p>
        <span class="field-capitalise">{{ t('global.factory') }}</span> :
        {{ magazine.factory.name }}
      </p>
      <p>
        <span class="field-capitalise">{{ t('magazine.compatibleWeapons') }}</span> :
      </p>
      <p>
        <span class="field-capitalise">{{ t('global.capacity') }}</span> :
        {{ magazine.capacity }}
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { WeaponMagazineDto } from '@/api/Api'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { magazine } = defineProps<{
  magazine: WeaponMagazineDto
}>()
</script>

<style scoped></style>
