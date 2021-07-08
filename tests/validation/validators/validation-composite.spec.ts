import { MissingParamError } from '@/presentation/errors'
import { ValidationSpy } from '@/tests/presentation/mocks'
import faker from 'faker'
import { ValidationComposite } from '@/validation/validators'

type SutTypes = {
  sut: ValidationComposite
  validationSpy: ValidationSpy[]
}

const makeSut = (): SutTypes => {
  const validationSpy = [
    new ValidationSpy(),
    new ValidationSpy()
  ]
  const sut = new ValidationComposite(validationSpy)
  return {
    sut,
    validationSpy
  }
}

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationSpy } = makeSut()
    validationSpy[1].error = new MissingParamError('field')
    const error = sut.validate({ field: faker.lorem.word() })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should return the first error if more than one validation fails', () => {
    const { sut, validationSpy } = makeSut()
    validationSpy[0].error = new Error()
    validationSpy[1].error = new MissingParamError('field')
    const error = sut.validate({ field: faker.lorem.word() })
    expect(error).toEqual(new Error())
  })

  test('Should not return if validation success', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: faker.lorem.word() })
    expect(error).toBeFalsy()
  })
})
