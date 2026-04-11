<template>
  <form-title-component :i18n-prefix="i18nPrefix" custom-status="save" />
  <form @submit.prevent="onSubmit">
    <div class="p-4">
      <DataTable :value="form.items" stripedRows showGridlines>
        <template #empty> {{ t(i18nPrefix + 'emptyCart') }} </template>
        <Column field="model" :header="t('global.model')" style="max-width: 4rem">
          <template #body="slotProps"
            ><router-link
              :to="{
                name: slotProps.data.to.name,
                params: {
                  id: slotProps.data.to.params.id,
                  category: slotProps.data.to.params.category
                }
              }"
            >
              {{ `${slotProps.data.factory.name}-${slotProps.data.name}` }}
            </router-link>
          </template>
        </Column>
        <Column field="price" :header="t('global.price')" style="max-width: 5rem">
          <template #body="slotProps">
            {{ NumberFormatter(slotProps.data.price, 'euro') }}
          </template>
        </Column>

        <Column field="object" :header="t('global.category')" style="max-width: 6rem">
          <template #body="slotProps">
            <legislation-category-badge-component
              :category="slotProps.data.category ? slotProps.data.category.name : null"
            />
          </template>
        </Column>
        <Column field="object" :header="t(i18nPrefix + 'object')" style="max-width: 4rem">
          <template #body="slotProps"> {{ t('orderStatus.' + slotProps.data.object) }} </template>
        </Column>
        <Column field="comment" :header="t(i18nPrefix + 'comment')" style="max-width: 12rem">
          <template #body="slotProps">
            <p>{{ slotProps.data.comment }}</p>
          </template>
        </Column>
        <Column field="quantity" :header="t('global.quantity')" style="max-width: 5rem">
          <template #body="slotProps">
            <div class="flex">
              <InputNumber
                v-model="slotProps.data.quantity"
                inputId="quantity"
                mode="decimal"
                :min="0"
                :max="slotProps.data.maxAvailableQuantity"
                fluid
              />
              <Button
                icon="pi pi-trash"
                aria-label="remove"
                severity="danger"
                text
                @click="remove(slotProps.data)"
              />
            </div>
          </template>
        </Column>
        <Column
          field="totalPrice"
          :header="t(i18nPrefix + 'totalPriceItem')"
          style="max-width: 5rem"
        >
          <template #body="slotProps">
            <p>{{ NumberFormatter(slotProps.data.price * slotProps.data.quantity, 'euro') }}</p>
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="px-4 mt-6 mr-4 flex flex-col items-end text-xl text-blue-500">
      <p>Nb d'article : {{ totalItems }}</p>
      <p>Prix a regler : {{ NumberFormatter(totalOrder, 'euro') }}</p>
    </div>
    <div class="text-center">
      <save-button :disabled="!isFormValid" status="next" :tooltip="tooltip" />
    </div>
  </form>
</template>
<script setup lang="ts">
import { useCartStore } from '@/stores/shared/cart.store'
import Column from 'primevue/column'
import InputNumber from 'primevue/inputnumber'
import DataTable from 'primevue/datatable'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import { NumberFormatter } from '@/shared/utils/formatter.utils'
import LegislationCategoryBadgeComponent from '@/components/__dataview/LegislationCategoryBadgeComponent.vue'
import FormTitleComponent from '@/components/__form/FormTitleComponent.vue'
import SaveButton from '@/components/__form/SaveButton.vue'
import { computed, watch } from 'vue'
import { useSecurityStore } from '@/stores/shared/security.store'
import { useConnexionStore } from '@/stores/connexion'
import type { CreateClientOrderItemDto } from '@/api/Api'
import { useRouter } from 'vue-router'
import { PublicRouterEnum } from '@/enum/router/public-router.enum'

const { t } = useI18n()
const store = useCartStore()
const securityStore = useSecurityStore()
const connexionStore = useConnexionStore()
const router = useRouter()
const i18nPrefix = store.getI18NPrefix

const { form, submit } = store.formBuilder()

const remove = (item: CreateClientOrderItemDto) => {
  store.removeFromCart(item)
}

const totalItems = computed(() => {
  return form.value.items.reduce((acc, item) => acc + item.quantity, 0)
})
const totalOrder = computed(() => {
  return form.value.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
})
//***********************Validateur*************************
const isFormValid = computed(() => {
  return form.value.items.every((item: CreateClientOrderItemDto) => {
    return item.quantity > 0
  })
})

const tooltip = computed(() => {
  if (isFormValid.value && securityStore.isLogged.value) {
    return 'nextStep'
  }
  return 'pleaseConnect'
})

const onSubmit = (data: any) => {
  if (!securityStore.isLogged.value) {
    connexionStore.toggleConnexionDialog()
  } else {
    console.log('Aller en step 2: adresse')
    router.push({ name: PublicRouterEnum.CART_ADDRESS })
  }
}
let timeout: any = null
watch(
  () => form.value.items.map((i) => i.quantity),
  () => {
    clearTimeout(timeout)
    store.updateSavedCart(form.value)
    timeout = setTimeout(() => {
      store.autoSaveCart()
      console.log('Aller en step 2: adresse')
    }, 1000)
  },
  { deep: false }
)
</script>

<style scoped></style>
