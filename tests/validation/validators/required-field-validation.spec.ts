import { MissingParamError } from '@/presentation/errors'
import faker from 'faker'
import { RequiredFieldValidation } from '@/validation/validators'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('field')
}
describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ other_field: faker.lorem.word() })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: faker.lorem.word() })
    expect(error).toBeFalsy()
  })
})
