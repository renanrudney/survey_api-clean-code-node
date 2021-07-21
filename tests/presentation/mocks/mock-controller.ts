
import faker from 'faker'
import { ok } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class ControllerSpy implements Controller {
  httpResponse = ok(faker.datatype.uuid())
  request: any

  async handle (request: any): Promise<HttpResponse> {
    this.request = request
    return this.httpResponse
  }
}
