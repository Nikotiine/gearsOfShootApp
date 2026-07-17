<template>
  <h2 class="text-center text-xl mt-4 text-orange-500">{{ t(i18nPrefix + 'selectShop') }}</h2>
  <DataView :value="data" layout="grid">
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
                  <span class=""> {{ item.name }}</span>
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
                    :label="t(i18nPrefix + 'collect')"
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
import { useI18n } from 'vue-i18n'
import { useAddressStore } from '@/stores/address.store'
import DataView from 'primevue/dataview'
import { ref } from 'vue'
const { t } = useI18n()
//TODO: Mettre en place une table d'adress boutique et gere ca en admin
const store = useAddressStore()
const { data } = store.getStoreAddresses()
const i18nPrefix = store.getI18NPrefix
const selectedAddress = ref<number>(0)
const emit = defineEmits(['select-address'])
const onSelectAddress = (id: number) => {
  emit('select-address', id)
}
</script>

<style scoped></style>
