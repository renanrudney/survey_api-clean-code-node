import { SurveyResultModel } from '@/domain/models'
import { SaveSurveyResultParams } from '@/domain/usecases'
import { mockSurveyResultModel } from '@/tests/domain/mocks'
import { LoadSurveyResultRepository, SaveSurveyResultRepository } from '@/data/protocols'

export class SaveSurveyResultRepositorySpy implements SaveSurveyResultRepository {
  saveParams: SaveSurveyResultParams

  async save (saveParams: SaveSurveyResultParams): Promise<void> {
    this.saveParams = saveParams
    return await Promise.resolve()
  }
}

export class LoadSurveyResultRepositorySpy implements LoadSurveyResultRepository {
  surveyId: string
  accountId: string
  surveyResult = mockSurveyResultModel()

  async loadBySurveyId (surveyId: string, accountId: string): Promise<SurveyResultModel> {
    this.surveyId = surveyId
    this.accountId = accountId
    return await Promise.resolve(this.surveyResult)
  }
}
