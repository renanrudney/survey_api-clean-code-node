import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import { mockSurveyResultModel } from '@/tests/domain/mocks'

export class SaveSurveyResultSpy implements SaveSurveyResult {
  saveParams: SaveSurveyResult.Params
  result = mockSurveyResultModel()

  async save (data: SaveSurveyResult.Params): Promise<SaveSurveyResult.Result> {
    this.saveParams = data
    return this.result
  }
}

export class LoadSurveyResultSpy implements LoadSurveyResult {
  surveyId: string
  accountId: string
  result = mockSurveyResultModel()

  async load (surveyId: string, accountId: string): Promise<LoadSurveyResult.Result> {
    this.surveyId = surveyId
    this.accountId = accountId

    return this.result
  }
}
