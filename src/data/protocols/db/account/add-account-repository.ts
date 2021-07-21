import { AddAccount } from '@/domain/usecases'

export interface AddAccountRepository {
  add: (data: AddAccount.Params) => Promise<AddAccount.Result>
}
