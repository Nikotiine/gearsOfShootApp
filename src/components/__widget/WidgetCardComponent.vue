<template>
  <div class="col-span-12 lg:col-span-6 xl:col-span-3">
    <div class="card mb-0 p-2 shadow shadow-gray-400 max-w-80 mx-auto">
      <div class="flex justify-between mb-4">
        <div>
          <span class="block text-muted-color font-medium mb-4">{{ props.title }}</span>
          <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
            {{ props.mainNumber }} {{ props.mainInformation }}
          </div>
        </div>
        <div
          class="flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-border cursor-pointer"
          style="width: 2.5rem; height: 2.5rem"
        >
          <Button asChild icon="pi pi-check" v-if="props.routerLink">
            <RouterLink :to="props.routerLink"><i :class="iconProps"></i></RouterLink>
          </Button>
          <i :class="iconProps" v-else></i>
        </div>
      </div>
      <span class="text-primary font-medium">{{ props.subNumber }} </span>
      <span class="text-muted-color">{{ props.subInformation }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'

export interface WidgetCardComponentProps {
  routerLink: string | null
  title: string
  icon: string
  iconColor: string
  mainInformation: string
  mainNumber: string
  subInformation: string
  subNumber: string
}
const { props } = defineProps<{
  props: WidgetCardComponentProps
}>()

const iconProps = computed(() => {
  const icon = props.icon ?? 'pi pi-check'
  const iconColor = props.iconColor ?? 'text-blue-500 '
  return `${icon} ${iconColor} !text-xl`
})
</script>

<style scoped></style>
