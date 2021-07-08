
import faker from 'faker'
import { ok } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export const mockData = (): any => ({
  id: faker.datatype.uuid(),
  data: faker.datatype.array()
})

export class ControllerSpy implements Controller {
  httpRequest: HttpRequest
  httpResponse = mockData()

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.httpRequest = httpRequest
    return await Promise.resolve(ok(this.httpResponse))
  }
}
