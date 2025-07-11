<template>
  <div class="space-y-4">
    <p v-for="item in props" :key="item.label">
      <span class="field-capitalise-underlined-semi-bold">{{ item.label }}</span>
      :
      {{ item.title }}
    </p>
  </div>
</template>
<script setup lang="ts">
export interface TabCardProps {
  label: string
  title: string | number
}
const { props } = defineProps<{
  props: TabCardProps[]
}>()
</script>

<style scoped></style>
