import { AddSurvey } from '@/domain/usecases'
import { AddSurveyRepository } from '../protocols'

export class DbAddSurvey implements AddSurvey {
  constructor (private readonly addSurveyRepository: AddSurveyRepository) {}
  async add (data: AddSurvey.Params): Promise<void> {
    await this.addSurveyRepository.add(data)
  }
}
