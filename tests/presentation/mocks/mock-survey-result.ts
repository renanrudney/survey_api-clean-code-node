import { SurveyResultModel } from '@/domain/models'
import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import { mockSurveyResultModel } from '@/tests/domain/mocks'

export class SaveSurveyResultSpy implements SaveSurveyResult {
  saveParams: SaveSurveyResult.Params
  surveyResult = mockSurveyResultModel()

  async save (saveParams: SaveSurveyResult.Params): Promise<SurveyResultModel> {
    this.saveParams = saveParams
    return await Promise.resolve(this.surveyResult)
  }
}

export class LoadSurveyResultSpy implements LoadSurveyResult {
  surveyId: string
  accountId: string
  surveyResult = mockSurveyResultModel()

  async load (surveyId: string, accountId: string): Promise<SurveyResultModel> {
    this.surveyId = surveyId
    this.accountId = accountId

    return await Promise.resolve(this.surveyResult)
  }
}
