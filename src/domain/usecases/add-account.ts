import { AccountModel } from '@/domain/models'

export type AddAccountParams = Omit<AccountModel, 'id'>

export interface AddAccount {
  add: (addAccountParams: AddAccountParams) => Promise<AccountModel>
}
