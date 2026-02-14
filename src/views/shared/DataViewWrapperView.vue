<template>
  <div class="card p-8">
    <DataView :value="data" :sortOrder="sortOrder" :sortField="sortField" :layout="layout">
      <template #header>
        <div class="flex justify-end">
          <Select
            v-model="sortKey"
            :options="sortOptions"
            optionLabel="label"
            :placeholder="t(prefix + 'orderByPrice')"
            @change="onSortChange($event)"
            class="mr-4"
            v-tooltip.top="t(prefix + 'orderBy')"
          />
          <SelectButton
            v-model="layout"
            :options="options"
            :allowEmpty="false"
            v-tooltip.top="t(prefix + 'changeDisplay')"
          >
            <template #option="{ option }">
              <i :class="[option === 'list' ? 'pi pi-bars' : 'pi pi-table']" />
            </template>
          </SelectButton>
        </div>
      </template>
      <template #empty>
        <div class="text-center">
          <h3 class="text-xl">{{ t(prefix + 'notItemToShow') }}</h3>
        </div>
      </template>
      <template #list="slotProps">
        <div class="flex flex-col">
          <div v-for="(item, index) in slotProps.items" :key="index">
            <div
              class="flex flex-col sm:flex-row sm:items-center p-6 gap-4 hover-card"
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
                    :value="item.stock === 0 ? t('global.outOfStock') : t('global.inStock')"
                    :severity="getSeverity(item)"
                  ></Tag>
                </div>
              </div>
              <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                  <div
                    class="text-lg font-medium"
                    @click="onCardClick(item.id, item.object, item.category)"
                  >
                    <p>
                      <span class="font-medium text-surface-500 dark:text-surface-400 text-lg">
                        {{ t('global.factory') }}:
                      </span>
                      {{ item.factory.name }}
                    </p>
                    <p class="mt-2">
                      <span class="font-medium text-surface-500 dark:text-surface-400 text-lg">
                        {{ t('global.model') }}:
                      </span>
                      {{ item.name }}
                    </p>
                    <p class="mt-2">
                      <span class="font-medium text-surface-500 dark:text-surface-400 text-lg">
                        {{ t('global.description') }}:
                      </span>
                      {{ item.subTitle }}
                    </p>
                  </div>
                  <div class="flex gap-2">
                    <rating-component :rating="5" />
                    <legistaltion-category-badge-component
                      :category="item.category ? item.category.name : null"
                    />
                  </div>
                </div>
                <div class="flex flex-col md:items-end gap-6">
                  <p
                    class="text-lg font-medium"
                    :class="item.discountedPrice ? 'line-through' : ''"
                  >
                    <span class="text-surface-500 dark:text-surface-400 text-lg">
                      {{ t('global.price') }}:
                    </span>
                    {{ NumberFormatter(item.price, 'euro') }}
                  </p>
                  <p class="text-lg font-medium" v-if="item.discountedPrice">
                    <span class="text-surface-500 dark:text-surface-400 text-lg">
                      {{ t('global.discountedPrice') }}:
                    </span>
                    {{ NumberFormatter(item.discountedPrice, 'euro') }}
                  </p>
                  <div class="flex flex-row-reverse md:flex-row gap-2">
                    <add-to-cart-button :item="item" :type="type" />
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
              @click="onCardClick(item.id, item.object, item.category)"
              class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col hover-card"
            >
              <div class="bg-surface-0 dark:bg-surface-900 flex justify-center rounded p-4">
                <div class="relative mx-auto">
                  <!--                  <img
                    class="rounded w-full"
                    :src="`https://primefaces.org/cdn/primevue/images/product/${item.image}`"
                    :alt="item.name"
                    style="max-width: 300px"
                  />-->
                  <div class="absolute bg-black/70 rounded-border" style="left: 4px; top: 4px">
                    <Tag
                      :value="item.stock === 0 ? t('global.outOfStock') : t('global.inStock')"
                      :severity="getSeverity(item)"
                    ></Tag>
                  </div>
                </div>
              </div>
              <div class="pt-6">
                <div class="flex flex-row justify-between items-start gap-2">
                  <div class="text-lg font-medium">
                    <p>
                      <span class="font-medium text-surface-500 dark:text-surface-400 text-lg">
                        {{ t('global.factory') }}:
                      </span>
                      {{ item.factory.name }}
                    </p>
                    <p class="mt-2">
                      <span class="font-medium text-surface-500 dark:text-surface-400 text-lg">
                        {{ t('global.model') }}:
                      </span>
                      {{ item.name }}
                    </p>
                    <p class="mt-2">
                      <span class="font-medium text-surface-500 dark:text-surface-400 text-lg">
                        {{ t('global.description') }}:
                      </span>
                      {{ item.subTitle }}
                    </p>
                  </div>
                  <div class="flex flex-col gap-2">
                    <rating-component :rating="5" />
                    <legistaltion-category-badge-component
                      :category="item.category ? item.category.name : null"
                    />
                  </div>
                </div>
                <div class="flex flex-col gap-6 mt-6">
                  <div class="flex gap-4 justify-end">
                    <p
                      class="text-lg font-medium"
                      :class="item.discountedPrice ? 'line-through' : ''"
                    >
                      <span class="text-surface-500 dark:text-surface-400 text-lg">
                        {{ t('global.price') }}:
                      </span>
                      {{ NumberFormatter(item.price, 'euro') }}
                    </p>
                    <p class="text-lg font-medium" v-if="item.discountedPrice">
                      <span class="text-surface-500 dark:text-surface-400 text-lg">
                        {{ t('global.discountedPrice') }}:
                      </span>
                      {{ NumberFormatter(item.discountedPrice, 'euro') }}
                    </p>
                  </div>

                  <div class="flex gap-2">
                    <add-to-cart-button :item="item" />
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
import SelectButton from 'primevue/selectbutton'
import Select from 'primevue/select'
import DataView from 'primevue/dataview'
import { useDataViewStore } from '@/stores/shared/dataview.store'
import { storeToRefs } from 'pinia'
import type { RoutableObjectType } from '@/types/routable.type'
import type { FactoryDto, LegislationCategoryDto } from '@/api/Api'
import { useI18n } from 'vue-i18n'
import RatingComponent from '@/components/__dataview/RatingComponent.vue'
import LegistaltionCategoryBadgeComponent from '@/components/__dataview/LegistaltionCategoryBadgeComponent.vue'
import { NumberFormatter } from '@/shared/utils/formatter.utils'
import type { RouteLocationRaw } from 'vue-router'
import AddToCartButton from '@/components/cart/AddToCartButton.vue'

export interface DataViewProps {
  id: number
  name: string
  stock: number
  price: number
  factory: FactoryDto
  subTitle: string
  description?: string
  category?: LegislationCategoryDto
  discountedPrice?: number
  to: RouteLocationRaw
  object: RoutableObjectType
}
const { t } = useI18n()
const prefix = 'dataView.'
const { data } = defineProps<{ data: DataViewProps[] }>()
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
const onCardClick = (id: number, object: RoutableObjectType, category?: LegislationCategoryDto) => {
  dataViewStore.redirectToDetail(object, id, category)
}
</script>

<style scoped>
.hover-card {
  transition:
    border 0.2s ease,
    cursor 0.2s ease;
}

.hover-card:hover {
  cursor: pointer;
  border: 2px solid rgb(57, 126, 240);
}
</style>
