import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { mockAccountModel } from '@/domain/test'
import { AccountModel, AddAccountParams, LoadAccountByEmailRepository } from '@/data/usecases/account/add-account/db-add-account-protocols'
import { LoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository'
import { UpdateAccessTokenRepository } from '../protocols/db/account/update-access-token-repository'
export class AddAccountRepositorySpy implements AddAccountRepository {
  accountModel = mockAccountModel()
  data: AddAccountParams
  async add (data: AddAccountParams): Promise<AccountModel> {
    this.data = data
    return await Promise.resolve(this.accountModel)
  }
}

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  accountModel = mockAccountModel()
  email: string
  async loadByEmail (email: string): Promise<AccountModel> {
    this.email = email
    return await Promise.resolve(this.accountModel)
  }
}

export class LoadAccountByTokenRepositorySpy implements LoadAccountByTokenRepository {
  accountModel = mockAccountModel()
  token: string
  role?: string
  async loadByToken (token: string, role?: string): Promise<AccountModel> {
    this.token = token
    this.role = role
    return await Promise.resolve(this.accountModel)
  }
}

export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
  id: string
  token: string

  async updateAccessToken (id: string, token: string): Promise<void> {
    this.id = id
    this.token = token
    return await Promise.resolve()
  }
}
