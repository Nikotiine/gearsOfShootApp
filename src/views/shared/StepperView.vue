<template>
  <div class="card flex justify-center">
    <Stepper class="basis-[50rem]" :value="index.toString()">
      <StepList>
        <Step
          v-for="step in steps"
          :key="step.value"
          :step="step"
          :value="step.value"
          @click="toto(step)"
          >{{ step.label }}</Step
        ></StepList
      >
    </Stepper>
  </div>
</template>
<script setup lang="ts">
import Stepper from 'primevue/stepper'
import StepList from 'primevue/steplist'
import Step from 'primevue/step'
import { useBreadcrumbStore } from '@/stores/breadcrumb.store'
import { storeToRefs } from 'pinia'
const store = useBreadcrumbStore()
const toto = store.goToStep
const { steps, activeStep: index } = storeToRefs(store)
</script>

<style scoped></style>
