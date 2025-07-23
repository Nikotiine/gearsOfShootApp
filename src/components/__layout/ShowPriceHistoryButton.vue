<template>
  <Button
    :label="t('priceHistory.showHistoryButtonLabel')"
    severity="info"
    @click="onClickAction()"
    text
  />
  <price-history-modal ref="priceHistoryModalRef" :id="id" :type="type" v-if="id" />
</template>
<script setup lang="ts">
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import PriceHistoryModal, {
  type PriceHistoryModalExposed
} from '@/components/__modal/PriceHistoryModal.vue'
import { ref } from 'vue'
import type { PriceableObjectType } from '@/types/priceable-object.type'
const priceHistoryModalRef = ref<PriceHistoryModalExposed | null>(null)
const { t } = useI18n()
const { id } = defineProps<{ id: string; type: PriceableObjectType }>()
const onClickAction = () => {
  priceHistoryModalRef.value?.show()
}
</script>

<style scoped></style>
