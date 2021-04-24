import { ok, serverError } from '../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../protocols'

export const mockRequest = (): HttpRequest => ({
  body: {
    any: 'body'
  }
})

export const mockServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

export const mockData = (): any => ({
  id: 'valid_id',
  data: 'any_data'
})

export class ControllerSpy implements Controller {
  httpRequest: HttpRequest

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.httpRequest = httpRequest
    return await Promise.resolve(ok(mockData()))
  }
}
