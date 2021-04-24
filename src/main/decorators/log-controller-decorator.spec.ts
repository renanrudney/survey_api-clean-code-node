import { LogErrorRepositorySpy } from '@/data/test'
import { ok } from '@/presentation/helpers/http/http-helper'
import { ControllerSpy, mockData, mockRequest, mockServerError } from '@/presentation/test'
import { LogControllerDecorator } from './log-controller-decorator'

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
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockData()))
  })

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerSpy, logErrorRepositorySpy } = makeSut()
    jest.spyOn(controllerSpy, 'handle').mockReturnValueOnce(Promise.resolve(mockServerError()))
    await sut.handle(mockRequest())
    expect(logErrorRepositorySpy.stack).toBe('any_stack')
  })
})
