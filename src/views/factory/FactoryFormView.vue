<template>
  <div class="card">type : {{ type }}</div>
</template>
<script setup lang="ts">
import { type CreateFactoryDto, CreateFactoryDtoTypeEnum } from '@/api/Api'
import { ref } from 'vue'

const { type } = defineProps<{
  type: CreateFactoryDtoTypeEnum
}>()
const initialFactoryFormObject: CreateFactoryDto = {
  name: '',
  description: '',
  type: type,
  ref: ''
}
const form = ref<CreateFactoryDto>({ ...initialFactoryFormObject })
</script>

<style scoped></style>
