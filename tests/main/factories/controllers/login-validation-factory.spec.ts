import { Validation } from '@/presentation/protocols'
import { EmailValidator } from '@/validation/protocols'
import { RequiredFieldValidation, EmailValidation, ValidationComposite } from '@/validation/validators'
import { makeLoginValidation } from '@/main/factories'

jest.mock('@/validation/validators/validation-composite')

const mockEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (_email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', mockEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
