import { type WeaponTypeDto, WeaponTypeDtoTypeEnum } from '@/api/Api'
import { getReloadModeDto } from '@/shared/api-dto/get-reload-mode.dto'

export const getWeaponTypeDto = (): WeaponTypeDto => {
  return {
    id: 0,
    name: '',
    reference: '',
    mode: getReloadModeDto(),
    type: WeaponTypeDtoTypeEnum.Riffle
  }
}
