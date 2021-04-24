import { mockSurveyResultModel } from '@/domain/test'
import { LoadSurveyResult } from '@/domain/usecases/survey-result/load-survey-result'
import { SaveSurveyResult, SaveSurveyResultParams, SurveyResultModel } from '@/presentation/controllers/survey-result/save-survey-result/save-survey-result-controller-protocols'

export class SaveSurveyResultSpy implements SaveSurveyResult {
  saveParams: SaveSurveyResultParams
  surveyResult = mockSurveyResultModel()

  async save (saveParams: SaveSurveyResultParams): Promise<SurveyResultModel> {
    this.saveParams = saveParams
    return await Promise.resolve(this.surveyResult)
  }
}

export class LoadSurveyResultSpy implements LoadSurveyResult {
  surveyId: string
  surveyResult = mockSurveyResultModel()

  async load (surveyId: string): Promise<SurveyResultModel> {
    this.surveyId = surveyId
    return await Promise.resolve(this.surveyResult)
  }
}
