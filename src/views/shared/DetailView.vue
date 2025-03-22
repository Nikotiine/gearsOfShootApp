<template>
  <component :is="detailComponent" v-if="id" :id="id" :key="id" />
</template>
<script setup lang="ts">
import { RouterEnum } from '@/enum/router.enum'
import SoundReducerDetailComponent from '@/components/__accessory/rds/SoundReducerDetailComponent.vue'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const id = ref<string | undefined>(route.params.id ? (route.params.id as string) : undefined)
enum DetailRoute {
  RDS_DETAIL = RouterEnum.RDS_DETAIL
}
const componentMap = {
  [DetailRoute.RDS_DETAIL]: SoundReducerDetailComponent
}
const detailComponent = computed(() => componentMap[route.name as DetailRoute])
</script>

<style scoped></style>
