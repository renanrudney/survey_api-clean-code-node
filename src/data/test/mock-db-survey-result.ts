import { mockSurveyResultModel } from '@/domain/test'
import { LoadSurveyResultRepository } from '../protocols/db/survey-result/load-survey-result-repository'
import { SaveSurveyResultParams, SaveSurveyResultRepository, SurveyResultModel } from '../usecases/survey-result/save-survey-result/db-save-survey-result-protocols'

export class SaveSurveyResultRepositorySpy implements SaveSurveyResultRepository {
  saveParams: SaveSurveyResultParams

  async save (saveParams: SaveSurveyResultParams): Promise<void> {
    this.saveParams = saveParams
    return await Promise.resolve()
  }
}

export class LoadSurveyResultRepositorySpy implements LoadSurveyResultRepository {
  surveyId: string
  surveyResult = mockSurveyResultModel()

  async loadBySurveyId (surveyId: string): Promise<SurveyResultModel> {
    this.surveyId = surveyId
    return await Promise.resolve(this.surveyResult)
  }
}
