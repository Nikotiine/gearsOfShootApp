<template>
  <h2 class="text-center text-xl text-blue-500">{{ titleLabel }}</h2>
  <DataView :value="addresses" layout="grid">
    <template #grid="slotProps">
      <div class="grid grid-cols-12 gap-4">
        <div
          v-for="(item, index) in slotProps.items"
          :key="index"
          class="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-6 p-2"
        >
          <div
            :class="
              selectedAddress === item.id
                ? 'border-blue-500 dark:order-blue-500'
                : 'border-surface-200 dark:border-surface-700'
            "
            class="p-6 border bg-surface-0 dark:bg-surface-900 rounded flex flex-col hover-card"
          >
            <div class="bg-surface-0 dark:bg-surface-900 flex justify-between rounded p-4">
              <div>
                <div>
                  <span class=""> {{ item.firstName }} - {{ item.firstName }}</span>
                </div>
                <div class="" style="border-radius: 30px">
                  <p>{{ item.streetNumber }} {{ item.street }}</p>
                  <p>{{ item.zipCode }} {{ item.city }}</p>
                  <p>{{ item.state }}</p>
                </div>
              </div>
              <div class="flex flex-col md:items-end gap-8">
                <span class="text-xl font-semibold"></span>
                <div class="flex flex-row-reverse md:flex-row gap-2">
                  <Button
                    icon="pi pi-address-book"
                    :label="buttonLabel"
                    severity="info"
                    class="flex-auto md:flex-initial whitespace-nowrap"
                    @click="onSelectAddress(item.id)"
                  ></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </DataView>
</template>
<script setup lang="ts">
import Button from 'primevue/button'
import DataView from 'primevue/dataview'
import { useI18n } from 'vue-i18n'
import type { AddressDto } from '@/api/Api'
import { computed, ref } from 'vue'
export type SelectAddressType = 'shipping' | 'payment'
const { t } = useI18n()
const emit = defineEmits(['select-address'])
const props = defineProps<{
  addresses: AddressDto[]
  addressType?: SelectAddressType
  i18nPrefix?: string
  selectedAddressInitialValue: number
}>()
const selectedAddress = ref<number>(props.selectedAddressInitialValue)
const onSelectAddress = (id: number) => {
  selectedAddress.value = id
  emit('select-address', id)
}
const titleLabel = computed(() => {
  const i18nSuffix =
    props.addressType === 'shipping' ? 'selectShippingAddress' : 'selectPaymentAddress'
  return t(props.i18nPrefix + i18nSuffix)
})
const buttonLabel = computed(() => {
  const i18nSuffix = props.addressType === 'shipping' ? 'sendToThisOne' : 'useThisOne'
  return t(props.i18nPrefix + i18nSuffix)
})
</script>

<style scoped></style>
