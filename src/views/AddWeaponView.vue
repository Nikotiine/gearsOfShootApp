<template>
  <div class="">
    <h2 class="text-center mt-2 text-2xl">Ajouter une arme de Categorie C</h2>
    <div class="card grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4" v-if="query.isSuccess">
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-circle"></i>
        </InputGroupAddon>
        <Select
          v-model="form.caliber"
          :options="query.data.data.calibers"
          optionLabel="name"
          placeholder="Calibre"
        />
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-warehouse"></i>
        </InputGroupAddon>
        <Select
          v-model="form.factory"
          :options="query.data.data.factories"
          filter
          optionLabel="name"
          placeholder="Marque"
        />
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-id-card"></i>
        </InputGroupAddon>
        <InputText v-model="form.name" placeholder="Nom" />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-receipt"></i>
        </InputGroupAddon>
        <InputText v-model="form.variation" placeholder="Variante" />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-map"></i>
        </InputGroupAddon>
        <Select
          v-model="form.type"
          :options="query.data.data.types"
          optionLabel="name"
          placeholder="type"
        />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-map"></i>
        </InputGroupAddon>
        <Select
          v-model="form.barrelType"
          :options="barrelTypes"
          optionLabel="name"
          placeholder="type de canon"
        />
        <InputNumber v-model="form.barrelLength" placeholder="Longueur du canon" />
        <InputGroupAddon>cm</InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <Checkbox id="isThreadedBarrel" v-model="form.isThreadedBarrel" :binary="true" />
          <label for="isThreadedBarrel" class="ml-2"> Canon filete </label>
        </InputGroupAddon>

        <Select
          v-model="form.threadedSize"
          :options="query.data.data.threadedSizes"
          optionLabel="size"
          placeholder="type de filetage"
        />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <Checkbox id="isAdjustableTrigger" v-model="form.isAdjustableTrigger" :binary="true" />
          <label for="isAdjustableTrigger" class="ml-2"> Detente reglable </label>
        </InputGroupAddon>
        <InputGroupAddon>de</InputGroupAddon>
        <InputNumber v-model="form.barrelLength" placeholder="Longueur du canon" />
        <InputGroupAddon>a</InputGroupAddon>
        <InputNumber v-model="form.barrelLength" placeholder="Longueur du canon" />
        <InputGroupAddon>kg</InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <Textarea
          v-model="form.description"
          autoResize
          rows="5"
          cols="30"
          class="w-full"
          placeholder="description"
        />
      </InputGroup>
    </div>
  </div>
</template>
<script setup lang="ts">
import Select from 'primevue/select'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputText from 'primevue/inputtext'
import Checkbox from 'primevue/checkbox'
import InputNumber from 'primevue/inputnumber'
import Textarea from 'primevue/textarea'

import { ref } from 'vue'
import { useWeaponStore } from '@/stores/weapon'
import { WeaponDtoBarrelTypeEnum } from '@/api/Api'
const { query } = useWeaponStore()
const form = ref({
  type: '',
  caliber: '',
  factory: '',
  name: '',
  variation: null,
  barrelType: WeaponDtoBarrelTypeEnum.Normal,
  isThreadedBarrel: false,
  barrelLength: 0,
  threadedSize: '',
  isAdjustableTrigger: false,
  description: ''
})
const barrelTypes = ref([
  { name: WeaponDtoBarrelTypeEnum.Normal },
  { name: WeaponDtoBarrelTypeEnum.SemiLourd },
  { name: WeaponDtoBarrelTypeEnum.Lourd }
])
</script>

<style scoped></style>
