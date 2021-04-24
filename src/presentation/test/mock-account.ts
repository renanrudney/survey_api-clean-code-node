import { mockAccountModel } from '@/domain/test'
import { AccountModel, AddAccount, AddAccountParams } from '@/presentation/controllers/login/signup/signup-controller-protocols'
import { Authentication, AuthenticationParams } from '@/presentation/controllers/login/login/login-controller-protocols'
import { LoadAccountByToken } from '../middlewares/auth-middleware-protocols'
import faker from 'faker'
import { AuthenticationModel } from '@/domain/models/authentication_model'

export class AddAccountSpy implements AddAccount {
  addAccountParams: AddAccountParams
  account = mockAccountModel()

  async add (addAccountParams: AddAccountParams): Promise<AccountModel> {
    this.addAccountParams = addAccountParams
    return await Promise.resolve(this.account)
  }
}

export class AuthenticationSpy implements Authentication {
  authenticationParams: AuthenticationParams
  authenticationModel = {
    accessToken: faker.datatype.uuid(),
    name: faker.name.findName()
  }

  async auth (authenticationParams: AuthenticationParams): Promise<AuthenticationModel> {
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
