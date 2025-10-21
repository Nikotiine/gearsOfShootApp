import { type UserDto, UserDtoRoleEnum } from '@/api/Api'

export const getUserDto = (): UserDto => {
  return {
    id: 0,
    address: '',
    city: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    role: UserDtoRoleEnum.USER,
    state: '',
    zipCode: ''
  }
}
