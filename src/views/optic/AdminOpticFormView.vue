<template>
  <optic-form-component :optic="optic?.data" />
</template>
<script setup lang="ts">
import OpticFormComponent from '@/components/__optic/OpticFormComponent.vue'
import { ref } from 'vue'
import { useOpticStore } from '@/stores/optic'
const store = useOpticStore()
const { id } = defineProps<{
  id?: string
}>()
const opticId = ref<number>(0)
if (id) {
  opticId.value = parseInt(id)
}
const { data: optic } = store.getById(opticId)
</script>

<style scoped></style>
