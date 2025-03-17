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
      <div>
        <span class="field-capitalise">{{ t('magazine.compatibleWeapons') }}</span> :
        <div v-if="magazine.forWeaponType.name === 'Pistolet' || 'Revolver'">
          <ul v-for="weapon in magazine.handguns" v-bind:key="weapon.id">
            <li class="text-blue-500">{{ weapon.factory.name }} - {{ weapon.name }}</li>
          </ul>
        </div>
        <div v-if="magazine.forWeaponType.name !== 'Pistolet' || 'Revolver'">
          <ul v-for="weapon in magazine.riffles" v-bind:key="weapon.id">
            <li class="text-blue-500">{{ weapon.factory.name }} - {{ weapon.name }}</li>
          </ul>
        </div>
      </div>

      <p>
        <span class="field-capitalise">{{ t('global.capacity') }}</span> :
        {{ magazine.capacity }}
      </p>
      <p>
        <span class="field-capitalise">{{ t('global.material') }}</span> :
        {{ magazine.body.name }}
      </p>
      <p>
        <span class="field-capitalise">{{ t('global.height') }}</span> : {{ magazine.height }} cm
      </p>
      <p>
        <span class="field-capitalise">{{ t('global.width') }}</span> : {{ magazine.width }} cm
      </p>
      <p>
        <span class="field-capitalise">{{ t('global.length') }}</span> : {{ magazine.length }} cm
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
