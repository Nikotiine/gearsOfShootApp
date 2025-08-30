import { ref, watch } from 'vue'
import { type UseMutationReturnType, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useToastStore } from '@/stores/toast'
import { getI18NPrefix, I18NSuffix } from '@/enum/I18NSuffix.enum'

export function useFormHandler<TForm extends object, TMutationResponse, TError = Error>(
  emptyForm: TForm,
  getByIdQuery: (id?: string) => ReturnType<typeof useQuery>,
  createMutation: UseMutationReturnType<TMutationResponse, TError, TForm, unknown>,
  updateMutation: UseMutationReturnType<TMutationResponse, TError, TForm & { id: number }, unknown>,
  storeName: string,
  getByIdQueryKey: string,
  getAllQueryKey: string | undefined,
  id?: string,
  formatData?: (data: any) => TForm // Optionnel : Transformer les données avant de les injecter dans le formulaire
) {
  const queryClient = useQueryClient()
  const form = ref<TForm>({ ...emptyForm })
  const prefix = getI18NPrefix(storeName)
  const { successMessage, errorMessage } = useToastStore()
  const resetForm = () => {
    form.value = { ...emptyForm }
  }

  if (!id) {
    resetForm()
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
          onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: [getByIdQueryKey] })
            successMessage(prefix + I18NSuffix.SUMMARY, prefix + I18NSuffix.UPDATED)
          },
          onError(error: any) {
            errorMessage(prefix + I18NSuffix.SUMMARY, 'error.' + error.response.data.message)
          }
        }
      )
    } else {
      createMutation.mutate(form.value, {
        onSuccess: async () => {
          if (getAllQueryKey) {
            await queryClient.invalidateQueries({ queryKey: [getAllQueryKey] })
          }
          successMessage(prefix + I18NSuffix.SUMMARY, prefix + I18NSuffix.CREATED)
          resetForm()
        },
        onError(error: any) {
          errorMessage(prefix + I18NSuffix.SUMMARY, 'error.' + error.response.data.message)
        }
      })
    }
  }

  return { form, isSuccess, resetForm, submit }
}
