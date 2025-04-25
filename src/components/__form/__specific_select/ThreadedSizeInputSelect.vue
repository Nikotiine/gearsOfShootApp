<template>
  <template>
    <InputGroup>
      <input-group-required-icon :is-validate="threadedSizeId > 0" v-if="required" />
      <input-group-optional-icon :is-completed="threadedSizeId > 0" v-else />
      <input-group-select
        :options="threadedSizesList"
        label="name"
        @option-id="onSelect($event)"
        :required="required"
        placeholder="name"
        filter
        input-id="threadedSizeId"
        :initial-value="threadedSizeId"
        :i18n-prefix="i18Prefix"
        :disabled="disabled"
      />
      <input-group-addon-open-drawer-button type="material" :close="closeDrawer" v-if="canAddNew" />
    </InputGroup>
  </template>
</template>
<script setup lang="ts">
import InputGroupOptionalIcon from '@/components/__form/InputGroupOptionalIcon.vue'
import InputGroupAddonOpenDrawerButton from '@/components/__form/InputGroupAddonOpenDrawerButton.vue'
import InputGroupRequiredIcon from '@/components/__form/InputGroupRequiredIcon.vue'
import InputGroupSelect from '@/components/__form/InputGroupSelect.vue'
import InputGroup from 'primevue/inputgroup'
import { useThreadedSizeStore } from '@/stores/threadedSize'
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
const {
  initialValue = 0,
  canAddNew = false,
  disabled = false,
  required = false
} = defineProps<{
  initialValue?: number
  canAddNew?: boolean
  disabled?: boolean
  required?: boolean
}>()
const store = useThreadedSizeStore()
const i18Prefix = store.getI18NPrefix
const { data: sizes$, refetch } = store.getAll()
const threadedSizeId = ref<number>(initialValue)
const { mutationSuccess } = storeToRefs(store)
const emit = defineEmits(['onSelect'])
const threadedSizesList = computed(() => sizes$.value || [])
const closeDrawer = ref(false)
const onSelect = (id: number) => {
  emit('onSelect', id)
  threadedSizeId.value = id
}
watch(
  () => mutationSuccess.value,
  (value) => {
    if (value) {
      refetch()
      mutationSuccess.value = false
      closeDrawer.value = value
    }
  }
)
</script>

<style scoped></style>
