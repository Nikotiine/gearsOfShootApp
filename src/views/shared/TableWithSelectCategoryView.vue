<template>
  <div class="flex justify-center mt-8">
    <select-category-component @select-category="(event) => (categoryId = event)" />
  </div>
  <component :is="formComponent" :key="categoryId" v-if="categoryId > 0" :categoryId="categoryId" />
</template>

<script setup lang="ts">
import SelectCategoryComponent from '@/components/__table/SelectCategoryComponent.vue'
import { computed, ref } from 'vue'
import { RouterEnum } from '@/enum/router.enum'
import AmmunitionTableComponent from '@/components/__ammunition/AmmunitionTableComponent.vue'
import { useRoute } from 'vue-router'
import MagazineTableComponent from '@/components/__weaponMagazine/MagazineTableComponent.vue'
enum TableWithSelectCategory {
  AMMUNITION = RouterEnum.AMMUNITION_LIST,
  MAGAZINE = RouterEnum.MAGAZINE_LIST
}
const route = useRoute()
const componentMap = {
  [TableWithSelectCategory.AMMUNITION]: AmmunitionTableComponent,
  [TableWithSelectCategory.MAGAZINE]: MagazineTableComponent
}
const categoryId = ref<number>(0)
const formComponent = computed(() => componentMap[route.name as TableWithSelectCategory])
</script>

<style scoped></style>
