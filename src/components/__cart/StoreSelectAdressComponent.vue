<template>
  <h2 class="text-center text-2xl">{{ t(i18nPrefix + 'selectShop') }}</h2>
  <div class="grid grid-cols-12 gap-4">
    <div class="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-6 p-2">
      <div
        class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col hover-card"
      >
        <div class="bg-surface-0 dark:bg-surface-900 flex justify-between rounded p-4">
          <div>
            <div>
              <span class=""> La boutique</span>
            </div>
            <div class="" style="border-radius: 30px">
              <p>adresse de la boutique</p>
              <p>code postal et ville</p>
              <p>France</p>
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
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import { useAddressStore } from '@/stores/address.store'
const { t } = useI18n()
const store = useAddressStore()
const i18nPrefix = store.getI18NPrefix
</script>

<style scoped></style>
