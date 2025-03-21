import { ref, watch } from 'vue'
import { type UseMutationReturnType, useQuery } from '@tanstack/vue-query'
import { useToastStore } from '@/stores/toast'

export function useFormHandler<TForm extends object, TMutationResponse, TError = Error>(
  emptyForm: TForm,
  getByIdQuery: (id?: string) => ReturnType<typeof useQuery>,
  createMutation: UseMutationReturnType<TMutationResponse, TError, TForm, unknown>,
  updateMutation: UseMutationReturnType<TMutationResponse, TError, TForm & { id: number }, unknown>,
  i18nPrefix: string,
  id?: string,
  formatData?: (data: any) => TForm // Optionnel : Transformer les données avant de les injecter dans le formulaire
) {
  const form = ref<TForm>({ ...emptyForm })
  const { successMessage } = useToastStore()
  const resetForm = () => {
    form.value = { ...emptyForm }
  }

  // Récupération des données en mode édition
  const { data, isSuccess } = getByIdQuery(id)

  watch(
    () => data.value,
    (newData) => {
      if (isSuccess.value && newData) {
        form.value = formatData ? formatData(newData) : newData
      }
    },
    { immediate: true }
  )

  // Soumission générique du formulaire
  const submit = () => {
    if (id) {
      updateMutation.mutate(
        { ...form.value, id: parseInt(id) },
        {
          onSuccess: () => {
            successMessage(i18nPrefix + '.summary', i18nPrefix + '.update')
          }
        }
      )
    } else {
      createMutation.mutate(form.value, {
        onSuccess: () => {
          successMessage(i18nPrefix + '.summary', i18nPrefix + '.success')
          resetForm()
        }
      })
    }
  }

  return { form, isSuccess, resetForm, submit }
}
