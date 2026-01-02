import { useI18n } from 'vue-i18n'
import type { FactoryTypeDto, FocalPlaneDto } from '@/api/Api'

export type NumberFormatterType =
  | 'mm'
  | 'cm'
  | 'pcs'
  | 'cps'
  | 'speed'
  | 'moa'
  | 'yrd'
  | 'db'
  | 'euro'
  | 'percent'
export function NumberFormatter(value: number | undefined, format: NumberFormatterType): string {
  const { t } = useI18n()
  if (value === 0 || !value) {
    return t('global.notRegistered')
  } else {
    return `${value} ${t('formatter.' + format)}`
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

export function VerifyFieldIsNotNull(value: string | number | null | undefined): string {
  const { t } = useI18n()
  if (!value) {
    return t('global.notRegistered')
  } else {
    return value.toString()
  }
}

export function ZoomFormatter(min: number, max: number, lensDiameter: number): string {
  return `${min}-${max} X ${lensDiameter}`
}

export function FocalPlaneFormatter(focalPlane: FocalPlaneDto): string {
  const { t } = useI18n()
  return `${t('formatter.' + focalPlane.name)} (${focalPlane.name})`
}

export function ParallaxFormatter(
  isAdjustable: boolean,
  min: number | null,
  max: number | null
): string {
  const { t } = useI18n()
  if (!isAdjustable || min === null || max === null || min === 0) {
    return t('global.no')
  } else {
    return `${t('global.yes')} ${t('formatter.setup')} ${NumberFormatter(min, 'yrd')} ${t('formatter.to')} ${NumberFormatter(max, 'yrd')}`
  }
}
export function DateFormatter(date: Date | string, format: 'short' | 'medium' | 'long' = 'medium') {
  const options: Intl.DateTimeFormatOptions = {
    dateStyle: format,
    timeStyle: format === 'short' ? undefined : 'short'
  }

  return new Intl.DateTimeFormat('fr-FR', options).format(new Date(date))
}
export function FactoryTypeFormatter(factories?: FactoryTypeDto[]) {
  const { t } = useI18n()
  if (!factories) return []
  return factories.map((f) => {
    return {
      ...f,
      label: t('factory.types.' + f.name)
    }
  })
}
