import { useI18n } from 'vue-i18n'

export type NumberFormatterType = 'mm' | 'cm'
export function NumberFormatter(value: number, format: NumberFormatterType): string {
  const { t } = useI18n()
  if (value === 0) {
    return t('global.notRegistered')
  } else {
    return `${value} ${format}`
  }
}
export function BooleanFormatter(boo: boolean): string {
  const { t } = useI18n()
  return boo ? t('global.yes') : t('global.no')
}
export function TriggerValueFormatter(
  min: number | null,
  max: number | null,
  isAdjustable: boolean
): string | null {
  const { t } = useI18n()
  if (min === null || max === null || max === 0 || min === 0 || !isAdjustable) {
    return ''
  }
  return `${t('formatter.setup')}${min} kg ${t('formatter.to')} ${max} kg`
}
export function VerifyFieldIsNotNull(value: string | number | null): string {
  console.log(value)
  const { t } = useI18n()
  if (!value) {
    return t('global.notRegistered')
  } else {
    return value.toString()
  }
}
