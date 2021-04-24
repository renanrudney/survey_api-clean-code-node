import { DbLoadAccountByToken } from './db-load-account-by-token'
import { throwError } from '@/domain/test'
import { LoadAccountByTokenRepositorySpy, DecrypterSpy } from '@/data/test'
import faker from 'faker'

type SutTypes = {
  sut: DbLoadAccountByToken
  decrypterSpy: DecrypterSpy
  loadAccountByTokenRepositorySpy: LoadAccountByTokenRepositorySpy
}
const makeSut = (): SutTypes => {
  const loadAccountByTokenRepositorySpy = new LoadAccountByTokenRepositorySpy()
  const decrypterSpy = new DecrypterSpy()
  const sut = new DbLoadAccountByToken(decrypterSpy, loadAccountByTokenRepositorySpy)
  return {
    sut,
    decrypterSpy,
    loadAccountByTokenRepositorySpy
  }
}
describe('DbLoadAccountByToken Usecase', () => {
  test('Should call Decrypter with correct values', async () => {
    const { sut, decrypterSpy } = makeSut()
    const accessToken = faker.datatype.uuid()
    await sut.load(accessToken, faker.lorem.word())
    expect(decrypterSpy.ciphertext).toBe(accessToken)
  })

  test('Should return null if Decrypter return null', async () => {
    const { sut, decrypterSpy } = makeSut()
    decrypterSpy.plaintext = null
    const account = await sut.load(faker.datatype.uuid(), faker.lorem.word())
    expect(account).toBeNull()
  })

  test('Should throw if Decrypter throws', async () => {
    const { sut, decrypterSpy } = makeSut()
    jest.spyOn(decrypterSpy, 'decrypt').mockImplementationOnce(throwError)
    const promise = sut.load(faker.datatype.uuid(), faker.lorem.word())
    await expect(promise).rejects.toThrow()
  })

  test('Should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    const accessToken = faker.datatype.uuid()
    const role = faker.lorem.word()
    await sut.load(accessToken, role)
    expect(loadAccountByTokenRepositorySpy.token).toBe(accessToken)
    expect(loadAccountByTokenRepositorySpy.role).toBe(role)
  })

  test('Should return null if LoadAccountByTokenRepository return null', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    loadAccountByTokenRepositorySpy.accountModel = null
    const account = await sut.load(faker.datatype.uuid(), faker.lorem.word())
    expect(account).toBeNull()
  })

  test('Should throw if LoadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByTokenRepositorySpy, 'loadByToken').mockImplementationOnce(throwError)
    const promise = sut.load(faker.datatype.uuid(), faker.lorem.word())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on success', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    const account = await sut.load(faker.datatype.uuid(), faker.lorem.word())
    expect(account).toEqual(loadAccountByTokenRepositorySpy.accountModel)
  })
})
