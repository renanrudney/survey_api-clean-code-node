import { SurveyModel } from '@/domain/models'
import { mockSurveyModel, mockSurveyModels } from '@/tests/domain/mocks'
import { AddSurveyRepository, LoadSurveyByIdRepository, LoadSurveysRepository } from '@/data/protocols'

export class AddSurveyRepositorySpy implements AddSurveyRepository {
  addSurveyParams: AddSurveyRepository.Params

  async add (data: AddSurveyRepository.Params): Promise<void> {
    this.addSurveyParams = data
    return await Promise.resolve(null)
  }
}

export class LoadSurveyByIdRepositorySpy implements LoadSurveyByIdRepository {
  surveyId: string
  survey = mockSurveyModel()

  async loadById (surveyId: string): Promise<SurveyModel> {
    this.surveyId = surveyId
    return await Promise.resolve(this.survey)
  }
}

export class LoadSurveysRepositorySpy implements LoadSurveysRepository {
  surveys = mockSurveyModels()
  accountId: string

  async loadAll (accountId: string): Promise<SurveyModel[]> {
    this.accountId = accountId
    return await Promise.resolve(this.surveys)
  }
}
