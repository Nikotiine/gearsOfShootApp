<template>
  <select-address-composant
    :addresses="addresses"
    :i18n-prefix="i18nPrefix"
    @select-address="(args) => onSelectAddress(args)"
    :addressType="type"
    :selected-address-initial-value="selectShippingAddress"
    :key="route.name"
  />
  <div class="text-center mt-4">
    <Button v-slot="slotProps">
      <RouterLink :to="{ name: PublicRouterEnum.CART_NEW_ADDRESS }" :class="slotProps.class">{{
        t(i18nPrefix + 'routerToNewAddress')
      }}</RouterLink>
    </Button>
  </div>

  <store-select-address-component v-if="!isPaymentAddressStep" />
  <div class="text-center mt-4" v-if="isAAddressSelected">
    <Button v-slot="slotProps" severity="info">
      <RouterLink :to="{ name: nexStepUrl }" :class="slotProps.class">{{
        t(i18nPrefix + 'resume')
      }}</RouterLink>
    </Button>
  </div>
</template>
<script setup lang="ts">
import { useAddressStore } from '@/stores/address.store'
import { computed, ref, watch } from 'vue'
import Button from 'primevue/button'
import StoreSelectAddressComponent from '@/components/__cart/StoreSelectAddressComponent.vue'
import { useI18n } from 'vue-i18n'
import { PublicRouterEnum } from '@/enum/router/public-router.enum'
import { useCartStore } from '@/stores/shared/cart.store'
import SelectAddressComposant from '@/components/__cart/SelectAddressComposant.vue'
import { useRoute } from 'vue-router'

const { t } = useI18n()
const store = useAddressStore()
const cartStore = useCartStore()

const route = useRoute()

const i18nPrefix = store.getI18NPrefix
const { data } = store.getAllUserAddress()
const addresses = computed(() => {
  if (!data.value) {
    return []
  }
  return data.value
})
const selectShippingAddress = ref<number>(0)

const isAAddressSelected = ref(false)
const onSelectAddress = async (addressId: number) => {
  const address = addresses.value.find((item) => item.id === addressId)
  const isPaymentAddressStep: boolean = route.name === 'CART_PAYMENT_ADDRESS'
  if (address) {
    if (isPaymentAddressStep) {
      cartStore.setPaymentAddress(address)
    } else {
      cartStore.setShippingAddress(address)
      cartStore.setPaymentAddress(address)
      selectShippingAddress.value = address.id
      isAAddressSelected.value = true
    }
  }
}
const type = computed(() => {
  const isPaymentAddressStep: boolean = route.name === 'CART_PAYMENT_ADDRESS'
  return isPaymentAddressStep ? 'payment' : 'shipping'
})
const nexStepUrl = computed(() => {
  const isPaymentAddressStep: boolean = route.name === 'CART_PAYMENT_ADDRESS'
  return isPaymentAddressStep ? PublicRouterEnum.CART_RESUME : PublicRouterEnum.CART_PAYMENT_ADDRESS
})

const isPaymentAddressStep = computed(() => {
  return route.name === 'CART_PAYMENT_ADDRESS'
})

watch(
  () => route.name,
  (value) => {
    const isPaymentAddressStep: boolean = value === 'CART_PAYMENT_ADDRESS'
    isPaymentAddressStep
      ? (selectShippingAddress.value = cartStore.getPaymentAddress()?.id ?? 0)
      : (selectShippingAddress.value = cartStore.getShippingAddress()?.id ?? 0)
  }
)
</script>

<style scoped></style>
