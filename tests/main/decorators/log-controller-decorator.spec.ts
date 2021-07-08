
import { ok, serverError } from '@/presentation/helpers'
import { HttpRequest, HttpResponse } from '@/presentation/protocols'
import { LogErrorRepositorySpy } from '@/tests/data/mocks'
import { ControllerSpy } from '@/tests/presentation/mocks'
import faker from 'faker'
import { LogControllerDecorator } from '@/main/decorators'

export const mockRequest = (): HttpRequest => ({
  body: {
    any: faker.datatype.array()
  }
})

export const mockServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = faker.lorem.word()
  return serverError(fakeError)
}

type SutTypes = {
  sut: LogControllerDecorator
  controllerSpy: ControllerSpy
  logErrorRepositorySpy: LogErrorRepositorySpy
}

const makeSut = (): SutTypes => {
  const controllerSpy = new ControllerSpy()
  const logErrorRepositorySpy = new LogErrorRepositorySpy()
  const sut = new LogControllerDecorator(controllerSpy, logErrorRepositorySpy)
  return {
    sut,
    controllerSpy,
    logErrorRepositorySpy
  }
}

describe('LogControllerDecorator', () => {
  test('Should call controller handle', async () => {
    const { controllerSpy, sut } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(controllerSpy.httpRequest).toBe(httpRequest)
  })

  test('Should return the same result of the controller', async () => {
    const { sut, controllerSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(controllerSpy.httpResponse))
  })

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerSpy, logErrorRepositorySpy } = makeSut()
    const serverError = mockServerError()
    jest.spyOn(controllerSpy, 'handle').mockReturnValueOnce(Promise.resolve(serverError))
    await sut.handle(mockRequest())
    expect(logErrorRepositorySpy.stack).toBe(serverError.body.stack)
  })
})
