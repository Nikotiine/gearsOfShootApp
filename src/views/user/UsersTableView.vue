<template>
  <div class="card p-4">
    <table-title-component :i18n-prefix="i18nPrefix" />
    <div class="text-red-500 text-center" v-if="isError">{{ t('global.isLoadingError') }}</div>
    <DataTable
      v-model:filters="filters"
      :value="users$?.data"
      paginator
      :rows="queryFilter$.limit"
      :total-records="users$?.total"
      :rowsPerPageOptions="[10, 20, 50]"
      dataKey="id"
      lazy
      @filter="onFilterChange"
      @page="onPageChange"
      filterDisplay="row"
      :loading="isLoading"
      :globalFilterFields="['name', 'email', 'lastName', 'role', 'costumerRole']"
    >
      <template #header>
        <div class="flex justify-center">
          <IconField>
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText v-model="filters['global'].value" :placeholder="t('global.globalSearch')" />
          </IconField>
        </div>
      </template>
      <template #empty> {{ t(i18nPrefix + 'notFound') }} </template>
      <template #loading> {{ t(i18nPrefix + 'loading') }} {{ t('global.pleaseWait') }} </template>
      <Column
        field="email"
        :header="t('global.email')"
        style="min-width: 12rem"
        :showFilterMenu="false"
      >
        <template #body="{ data }">
          {{ data.email }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            :placeholder="t(i18nPrefix + 'findByEmail')"
          />
        </template>
      </Column>
      <Column
        field="lastName"
        :header="t(i18nPrefix + 'lastName')"
        style="min-width: 12rem"
        :showFilterMenu="false"
      >
        <template #body="{ data }">
          {{ data.lastName }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            :placeholder="t(i18nPrefix + 'findByLastName')"
          />
        </template>
      </Column>
      <Column
        :header="t(i18nPrefix + 'role')"
        field="role"
        filterField="role"
        :showFilterMenu="false"
        style="min-width: 14rem"
      >
        <template #body="{ data }">
          {{ data.role }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <Select
            v-model="filterModel.value"
            @change="filterCallback()"
            :options="roles$"
            :placeholder="t(i18nPrefix + 'findByRole')"
            optionLabel="name"
            optionValue="value"
            style="min-width: 12rem"
            :showClear="true"
          >
          </Select>
        </template>
      </Column>
      <Column
        :header="t(i18nPrefix + 'costumerRoles')"
        field="costumerRoles"
        filterField="costumerRoles"
        :showFilterMenu="false"
        style="min-width: 14rem"
      >
        <template #body="{ data }">
          {{ data.costumerRoles }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <Select
            v-model="filterModel.value"
            @change="filterCallback()"
            :options="costumerRole$"
            :placeholder="t(i18nPrefix + 'findByCostumerRoles')"
            optionLabel="name"
            optionValue="name"
            style="min-width: 12rem"
            :showClear="true"
          >
          </Select>
        </template>
      </Column>

      <Column :header="t('global.action')" :showFilterMenu="false" style="min-width: 12rem">
        <template #body="{ data }">
          <action-menu-component
            @on-click-action="onClickAction"
            type="optic"
            :reference="data.reference"
            :id="data.id"
            v-if="$route.meta.admin"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user.store'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'
import DataTable, { type DataTableFilterEvent, type DataTablePageEvent } from 'primevue/datatable'
import TableTitleComponent from '@/components/__table/TableTitleComponent.vue'
import InputIcon from 'primevue/inputicon'
import IconField from 'primevue/iconfield'
import InputText from 'primevue/inputtext'
import Column from 'primevue/column'
import Select from 'primevue/select'
import ActionMenuComponent, {
  type ActionMenuEmit
} from '@/components/__table/ActionMenuComponent.vue'
import { AdminRouterEnum } from '@/enum/router/admin-router.enum'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { I18nPrefix } from '@/i18n/i18n-prefix.enum'
import { UserDtoCostumerRolesEnum, UserDtoRoleEnum } from '@/api/Api'

const store = useUserStore()
const { t } = useI18n()
const router = useRouter()
const i18nPrefix = I18nPrefix.USERS
const { queryFilter$ } = storeToRefs(store)
const { data: users$, isError, isLoading, refetch } = store.getAll()
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  lastName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  role: { value: UserDtoRoleEnum.USER, matchMode: FilterMatchMode.EQUALS },
  // 'focalPlane.name': { value: null, matchMode: FilterMatchMode.EQUALS },
  costumerRoles: { value: null, matchMode: FilterMatchMode.EQUALS }
})
const onFilterChange = (event: DataTableFilterEvent) => {
  const activeFilters = Object.fromEntries(
    Object.entries(event.filters).map(([key, meta]: any) => [key, meta.value])
  )
  queryFilter$.value.email = activeFilters.email
  queryFilter$.value.role = activeFilters.role
  queryFilter$.value.lastName = activeFilters.lastName
  queryFilter$.value.costumerRole = activeFilters.costumerRoles
}
const onPageChange = (event: DataTablePageEvent) => {
  queryFilter$.value.offset = event.first
  queryFilter$.value.limit = event.rows
}
const roles$ = ref([
  {
    name: 'admin',
    value: UserDtoRoleEnum.ADMIN
  },
  {
    name: 'utilisateur',
    value: UserDtoRoleEnum.USER
  }
])
const costumerRole$ = ref([
  {
    name: 'Licencie fftir',
    value: UserDtoCostumerRolesEnum.LicencieFFTIR
  },
  {
    name: 'Licencie balltrap',
    value: UserDtoCostumerRolesEnum.LicencieBallTrap
  },
  {
    name: 'Sans licence',
    value: UserDtoCostumerRolesEnum.SansLicence
  },
  {
    name: 'Permis de chasser',
    value: UserDtoCostumerRolesEnum.Chasseur
  },
  {
    name: 'Licencie biathlon',
    value: UserDtoCostumerRolesEnum.LicencieBIATHLON
  }
])
const onClickAction = (event: ActionMenuEmit | boolean, id: number) => {
  switch (event) {
    case 'view':
      router.push({ name: AdminRouterEnum.OPTIC_DETAIL, params: { id: id } })
      break
    case 'edit':
      router.push({ name: AdminRouterEnum.OPTIC_EDIT, params: { id: id } })
      break
    case true:
      //store.delete(id)
      refetch()
      break
  }
}
</script>

<style scoped></style>
