<template>
  <div class="space-y-4">
    <p v-for="item in props" :key="item.label">
      <span class="field-capitalise-underlined-semi-bold">{{ item.label }}</span>
      :
      {{ item.title }}
    </p>
    <Button
      :label="buttonProps.label"
      :severity="buttonProps.severity"
      v-if="buttonProps"
      @click="buttonProps.onClickAction()"
      text
    />
  </div>
</template>
<script setup lang="ts">
import Button from 'primevue/button'

export interface TabCardButtonProps {
  label: string
  onClickAction: Function
  severity: 'secondary' | 'success' | 'info' | 'warn' | 'help' | 'danger' | 'contrast' | undefined
}
export interface TabCardProps {
  label: string
  title: string | number
}
const { props } = defineProps<{
  props: TabCardProps[]
  buttonProps?: TabCardButtonProps
}>()
</script>

<style scoped></style>
