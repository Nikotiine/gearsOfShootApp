<template>
  <div class="card p-8">
    <DataView :value="data" :sortOrder="sortOrder" :sortField="sortField" :layout="layout">
      <template #header>
        <div class="flex justify-end">
          <Select
            v-model="sortKey"
            :options="sortOptions"
            optionLabel="label"
            placeholder="Sort By Price"
            @change="onSortChange($event)"
            class="mr-4"
            v-tooltip.top="'Trier par'"
          />
          <SelectButton
            v-model="layout"
            :options="options"
            :allowEmpty="false"
            v-tooltip.top="'Changer d affichage'"
          >
            <template #option="{ option }">
              <i :class="[option === 'list' ? 'pi pi-bars' : 'pi pi-table']" />
            </template>
          </SelectButton>
        </div>
      </template>
      <template #list="slotProps">
        <div class="flex flex-col">
          <div v-for="(item, index) in slotProps.items" :key="index">
            <div
              class="flex flex-col sm:flex-row sm:items-center p-6 gap-4"
              :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }"
            >
              <div class="md:w-40 relative">
                <!--                <img
                  class="block xl:block mx-auto rounded w-full"
                  :src="`https://primefaces.org/cdn/primevue/images/product/${item.image}`"
                  :alt="item.name"
                />-->
                <div class="absolute bg-black/70 rounded-border" style="left: 4px; top: 4px">
                  <Tag
                    :value="item.stock === 0 ? 'Rupture' : 'En stock'"
                    :severity="getSeverity(item)"
                  ></Tag>
                </div>
              </div>
              <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                  <div>
                    <p class="font-medium text-surface-500 dark:text-surface-400 text-lg">
                      {{ item.factoryName }}
                    </p>
                    <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{
                      item.subTitle
                    }}</span>

                    <div class="text-lg font-medium mt-2">{{ item.name }}</div>
                  </div>
                  <div class="bg-surface-100 p-1" style="border-radius: 30px">
                    <div
                      class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2"
                      style="
                        border-radius: 30px;
                        box-shadow:
                          0px 1px 2px 0px rgba(0, 0, 0, 0.04),
                          0px 1px 2px 0px rgba(0, 0, 0, 0.06);
                      "
                    >
                      <span class="text-surface-900 font-medium text-sm">5</span>
                      <i class="pi pi-star-fill text-yellow-500"></i>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col md:items-end gap-8">
                  <span class="text-xl font-semibold">${{ item.price }}</span>
                  <div class="flex flex-row-reverse md:flex-row gap-2">
                    <Button icon="pi pi-heart" variant="outlined"></Button>
                    <Button
                      icon="pi pi-shopping-cart"
                      label="Buy Now"
                      :disabled="item.stock === 0"
                      class="flex-auto md:flex-initial whitespace-nowrap"
                    ></Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #grid="slotProps">
        <div class="grid grid-cols-12 gap-4">
          <div
            v-for="(item, index) in slotProps.items"
            :key="index"
            class="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-6 p-2"
          >
            <div
              class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col"
            >
              <div class="bg-surface-50 flex justify-center rounded p-4">
                <div class="relative mx-auto">
                  <!--                  <img
                    class="rounded w-full"
                    :src="`https://primefaces.org/cdn/primevue/images/product/${item.image}`"
                    :alt="item.name"
                    style="max-width: 300px"
                  />-->
                  <div class="absolute bg-black/70 rounded-border" style="left: 4px; top: 4px">
                    <Tag
                      :value="item.inStock === 0 ? 'Rupture' : 'En stock'"
                      :severity="getSeverity(item)"
                    ></Tag>
                  </div>
                </div>
              </div>
              <div class="pt-6">
                <div class="flex flex-row justify-between items-start gap-2">
                  <div>
                    <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{
                      item.subTitle
                    }}</span>
                    <div class="text-lg font-medium mt-1">{{ item.name }}</div>
                  </div>
                  <div class="bg-surface-100 p-1" style="border-radius: 30px">
                    <div
                      class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2"
                      style="
                        border-radius: 30px;
                        box-shadow:
                          0px 1px 2px 0px rgba(0, 0, 0, 0.04),
                          0px 1px 2px 0px rgba(0, 0, 0, 0.06);
                      "
                    >
                      <span class="text-surface-900 font-medium text-sm">2</span>
                      <i class="pi pi-star-fill text-yellow-500"></i>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col gap-6 mt-6">
                  <span class="text-2xl font-semibold">${{ item.price }}</span>
                  <div class="flex gap-2">
                    <Button
                      icon="pi pi-shopping-cart"
                      label="Buy Now"
                      :disabled="item.stock === 0"
                      class="flex-auto whitespace-nowrap"
                    ></Button>
                    <Button icon="pi pi-heart" variant="outlined"></Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <!--      <template #list v-if="isLoading">
        <empty-data-view-list-component />
      </template>

      <template #grid>
        <empty-data-view-grid-component v-if="isLoading" />
      </template>-->
    </DataView>
  </div>
</template>
<script setup lang="ts">
import Tag from 'primevue/tag'
import Button from 'primevue/button'
import SelectButton from 'primevue/selectbutton'
import Select from 'primevue/select'
import DataView from 'primevue/dataview'
import { useDataViewStore } from '@/stores/shared/dataview.store'
import { storeToRefs } from 'pinia'
import type { RoutableObjectType } from '@/types/routable.type'

export interface DataViewProps {
  id: number
  name: string
  stock: number
  price: number
  factoryName: string
  subTitle: string
  description?: string
}
const { data } = defineProps<{ data: DataViewProps[]; type: RoutableObjectType }>()
const dataViewStore = useDataViewStore()
const {
  sortOptions,
  layout,
  layoutOptions: options,
  sortField,
  sortKey,
  sortOrder
} = storeToRefs(dataViewStore)
const onSortChange = (event: any) => {
  dataViewStore.onSortChange(event)
}
const getSeverity = (item: DataViewProps) => {
  return dataViewStore.getSeverity(item.stock)
}
</script>

<style scoped></style>
