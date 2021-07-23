
import faker from 'faker'
import { AccountModel } from '@/domain/models'
import { AddAccount, Authentication, LoadAccountByToken } from '@/domain/usecases'
import { mockAccountModel } from '@/tests/domain/mocks'

export class AddAccountSpy implements AddAccount {
  isValid = true
  addAccountParams: AddAccount.Params

  async add (addAccountParams: AddAccount.Params): Promise<AddAccount.Result> {
    this.addAccountParams = addAccountParams
    return this.isValid
  }
}

export class AuthenticationSpy implements Authentication {
  authenticationParams: Authentication.Params
  authenticationModel = {
    accessToken: faker.datatype.uuid(),
    name: faker.name.findName()
  }

  async auth (authenticationParams: Authentication.Params): Promise<Authentication.Result> {
    this.authenticationParams = authenticationParams
    return await Promise.resolve(this.authenticationModel)
  }
}

export class LoadAccountByTokenSpy implements LoadAccountByToken {
  accountModel = mockAccountModel()
  accessToken: string
  role?: string
  async load (accessToken: string, role?: string): Promise<AccountModel> {
    this.accessToken = accessToken
    this.role = role
    return await Promise.resolve(this.accountModel)
  }
}
