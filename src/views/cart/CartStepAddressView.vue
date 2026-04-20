<template>
  <h2 class="text-center text-xl text-blue-500">{{ t(i18nPrefix + 'selectShippingAddress') }}</h2>

  <DataView :value="addresses" layout="grid">
    <template #grid="slotProps">
      <div class="grid grid-cols-12 gap-4">
        <div
          v-for="(item, index) in slotProps.items"
          :key="index"
          class="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-6 p-2"
        >
          <div
            class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col hover-card"
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
                    :label="t(i18nPrefix + 'sendToThisOne')"
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
  <div class="text-center mt-4">
    <Button v-slot="slotProps">
      <RouterLink :to="{ name: PublicRouterEnum.CART_NEW_ADDRESS }" :class="slotProps.class">{{
        t(i18nPrefix + 'routerToNewAddress')
      }}</RouterLink>
    </Button>
  </div>

  <store-select-adress-component />
</template>
<script setup lang="ts">
import { useAddressStore } from '@/stores/address.store'
import { computed } from 'vue'
import Button from 'primevue/button'
import DataView from 'primevue/dataview'
import StoreSelectAdressComponent from '@/components/__cart/StoreSelectAdressComponent.vue'
import { useI18n } from 'vue-i18n'
import { PublicRouterEnum } from '@/enum/router/public-router.enum'
import { useCartStore } from '@/stores/shared/cart.store'
import type { AddressDto } from '@/api/Api'
import { storeToRefs } from 'pinia'
const { t } = useI18n()
const store = useAddressStore()
const cartStore = useCartStore()

const i18nPrefix = store.getI18NPrefix
const { data } = store.getAllUserAddress()
const addresses = computed(() => {
  if (!data.value) {
    return []
  }
  return data.value
})
const onSelectAddress = (addressId: number) => {
  const address = addresses.value.find((item) => item.id === addressId)
  if (address) {
    cartStore.setShippingAddress(address)
  }
}
</script>

<style scoped></style>
