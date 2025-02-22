<template>
  <h2 class="text-2xl font-bold mb-4 text-blue-500 text-center mt-10">
    <span class="text-white">{{ t('global.' + type) }}</span> : {{ weapon.factory.name }}
    {{ weapon.name }}
  </h2>

  <div class="p-6 shadow-md rounded-lg max-w-md mt-6">
    <div class="space-y-4">
      <p>
        <span class="field-capitalise">{{ t('global.category') }}</span> :
        {{ weapon.category.name }}
      </p>

      <p>
        <span class="field-capitalise">{{ t('global.caliber') }}</span> :

        {{ weapon.caliber.name }}
      </p>

      <p>
        <span class="field-capitalise">{{ t('global.factory') }}</span> :
        {{ weapon.factory.name }}
      </p>

      <p>
        <span class="field-capitalise">{{ t('global.model') }}</span> :
        {{ weapon.name }}
        {{ weapon.variation ? ` - ${weapon.variation}` : '' }}
      </p>

      <p>
        <span class="field-capitalise">{{ t('weapon.common.percussionType') }}</span>
        :
        {{ weapon.percussionType.name }}
      </p>

      <p>
        <span class="field-capitalise">{{ t('weapon.common.barrelType') }}</span> :
        {{ weapon.barrelType.name }}
      </p>

      <p>
        <span class="field-capitalise">{{ t('weapon.common.barrelLength') }}</span>
        :

        {{ weapon.barrelLength }} cm ({{ (weapon.barrelLength / 2.54).toFixed() }}
        {{ t('global.inches') }})
      </p>

      <p>
        <span class="field-capitalise">{{ t('weapon.common.barrelSize') }}</span>
        : {{ weapon.barrelSize > 0 ? weapon.barrelSize + 'mm' : t('global.notRegistered') }}
      </p>

      <p>
        <span class="field-capitalise">{{ t('weapon.common.barrelColor') }}</span>
        :

        {{ weapon.barrelColor ? weapon.barrelColor.name : t('global.notRegistered') }}
      </p>

      <p>
        <span class="field-capitalise">{{ t('weapon.common.isThreadedBarrel') }}</span>
        :
        {{ weapon.isThreadedBarrel ? t('global.yes') : t('global.no') }}
        {{
          weapon.isThreadedBarrel ? `- ${t('global.threadedSize')} ${weapon.threadedSize.size}` : ''
        }}
      </p>

      <p>
        <span class="field-capitalise">{{ t('weapon.common.isAdjustableTrigger') }}</span>
        :
        {{ weapon.isAdjustableTrigger ? t('global.yes') : t('global.no') }}
        {{ weapon.isAdjustableTrigger ? `Réglage de ${weapon.adjustableTriggerValue}` : '' }}
      </p>

      <p>
        <span class="field-capitalise">{{ t('weapon.common.buttMaterial') }}</span>
        :
        {{ weapon.buttMaterial ? weapon.buttMaterial.name : t('global.notRegistered') }}
      </p>

      <p>
        <span class="field-capitalise">{{ t('weapon.common.buttColor') }}</span>
        :
        {{ weapon.buttColor ? weapon.buttColor.name : t('global.notRegistered') }}
      </p>

      <p v-if="!isRiffle">
        <span class="field-capitalise">{{ t('weapon.common.slideMaterial') }}</span>
        :
        {{ weapon.slideMaterial ? weapon.slideMaterial.name : t('global.notRegistered') }}
      </p>
      <p v-if="!isRiffle">
        <span class="field-capitalise">{{ t('weapon.common.slideColor') }}</span>
        :
        {{ weapon.slideColor ? weapon.slideColor.name : t('global.notRegistered') }}
      </p>
      <p v-if="isRiffle">
        <span class="field-capitalise">{{ t('weapon.common.isAdjustableButt') }}</span>
        :
        {{ weapon.isAdjustableButt ? t('global.yes') : t('global.no') }}
      </p>
      <p v-if="isRiffle">
        <span class="field-capitalise">{{ t('weapon.common.isAdjustableBusk') }}</span>
        :

        {{ weapon.isAdjustableBusk ? t('global.yes') : t('global.no') }}
      </p>
      <p>
        <span class="field-capitalise">{{ t('weapon.common.providedMagazineQuantity') }}</span>
        :
        {{ weapon.providedMagazineQuantity }}
      </p>
      <p v-if="weapon.providedMagazineQuantity > 0">
        <span class="font-bold text-blue-500">Modifier ici ca peut etre plusieurs: </span>
        {{ weapon.providedMagazine?.reference }}
      </p>
      <p v-if="isRiffle">
        <span class="field-capitalise">{{ t('weapon.common.isOpenAim') }}</span>
        :
        {{ weapon.isOpenAim ? t('global.yes') : t('global.no') }}
      </p>
      <p>
        <span class="field-capitalise">{{ t('weapon.common.isAdjustableFrontSight') }}</span>
        :

        {{ weapon.isAdjustableFrontSight ? t('global.yes') : t('global.no') }}
      </p>
      <p>
        <span class="field-capitalise">{{ t('weapon.common.isAdjustableBackSight') }}</span>
        :
        {{ weapon.isAdjustableBackSight ? t('global.yes') : t('global.no') }}
      </p>
      <p v-if="isRiffle">
        <span class="field-capitalise">{{ t('weapon.common.railSize') }}</span>
        :
        {{ weapon.railSize ? weapon.railSize.name : t('global.notRegistered') }}
      </p>
      <p v-if="!isRiffle">
        <span class="field-capitalise">{{ t('weapon.common.decocking') }}</span>
        :
        {{ weapon.decocking ? t('global.yes') : t('global.no') }}
      </p>
      <p v-if="!isRiffle">
        <span class="field-capitalise">{{ t('weapon.common.triggerType') }}</span>
        :

        {{ weapon.triggerType ? weapon.triggerType.name : t('global.notRegistered') }}
      </p>
      <p v-if="!isRiffle">
        <span class="field-capitalise">{{ t('weapon.common.isExternalHammer') }}</span>
        :
        {{ weapon.isExternalHammer ? t('global.yes') : t('global.no') }}
      </p>
      <p v-if="!isRiffle">
        <span class="field-capitalise">{{ t('weapon.common.isPicatinyRailSlop') }}</span>
        :
        {{ weapon.isPicatinyRailSlop ? t('global.yes') : t('global.no') }}
      </p>
      <p v-if="!isRiffle">
        <span class="field-capitalise">{{ t('weapon.common.isOpticReady') }}</span>
        :
        {{ weapon.isOpticReady ? t('global.yes') : t('global.no') }}
      </p>
      <div v-if="!isRiffle && weapon.isOpticReady">
        <span class="field-capitalise">{{ t('weapon.common.providedOpticReadyPlates') }}</span>
        :
        <p v-for="plate in weapon.opticReadyPlates" :key="plate.id" class="my-1">
          {{ plate.name }}
        </p>
      </div>

      <p v-if="isRiffle">
        <span class="field-capitalise">{{ t('weapon.common.qcSlot') }}</span>
        :
        {{ weapon.qcSlot }}
      </p>
      <p v-if="isRiffle">
        <span class="field-capitalise">{{ t('weapon.common.grenadierSlot') }}</span>
        :
        {{ weapon.grenadierSlot }}
      </p>
      <p v-if="isRiffle">
        <span class="field-capitalise">{{ t('weapon.common.isMlockCompatibility') }}</span>
        :
        {{ weapon.isMlockCompatibility ? t('global.yes') : t('global.no') }} <br />
      </p>
      <p v-if="isRiffle && weapon.isMlockCompatibility">
        <span class="font-bold text-blue-500" v-if="weapon.isMlockCompatibility"
          >{{ t('weapon.common.mLockOptions') }} : </span
        >{{ weapon.isMlockCompatibility ? mlock : '' }}
      </p>
      <p>
        <span class="field-capitalise">{{ t('global.reference') }}</span>
        :
        <span class="font-bold text-green-500"> {{ weapon.reference }}</span>
      </p>
      <p v-if="weapon.description.length > 0">
        <span class="field-capitalise">{{ t('global.description') }}</span>
        :{{ weapon.description }}
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { WeaponViewType } from '@/views/weapon/WeaponView.vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { WeaponViewModel } from '@/stores/weapon'
const { t } = useI18n()
const { weapon, type } = defineProps<{
  weapon: WeaponViewModel
  type: WeaponViewType
}>()
const isRiffle = computed(() => {
  return type === 'riffle'
})
const mlock = computed(() => {
  let options: string = ''
  if (weapon.mLockOptions) {
    for (const option of weapon.mLockOptions) {
      options += option.name + ' '
    }
  }
  return options
})
</script>

<style scoped>
.field-capitalise {
  font-weight: 700;
  --tw-text-opacity: 1;
  color: rgb(59 130 246 / var(--tw-text-opacity));
  text-transform: capitalize;
}
</style>
