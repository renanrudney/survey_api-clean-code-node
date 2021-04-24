import { mockSurveyModel, mockSurveyModels } from '@/domain/test'
import { AddSurvey, AddSurveyParams } from '@/presentation/controllers/survey/add-survey/add-surver-controller-protocols'
import { LoadSurveyById } from '../controllers/survey-result/save-survey-result/save-survey-result-controller-protocols'
import { LoadSurveys, SurveyModel } from '../controllers/survey/load-surveys/load-surveys-controller-protocols'

export class AddSurveySpy implements AddSurvey {
  addSurveyParams: AddSurveyParams

  async add (addSurveyParams: AddSurveyParams): Promise<void> {
    this.addSurveyParams = addSurveyParams
    return await Promise.resolve()
  }
}

export class LoadSurveysSpy implements LoadSurveys {
  surveys = mockSurveyModels()

  async load (): Promise<SurveyModel[]> {
    return await Promise.resolve(this.surveys)
  }
}

export class LoadSurveyByIdSpy implements LoadSurveyById {
  surveyId: string
  survey = mockSurveyModel()

  async loadById (surveyId: string): Promise<SurveyModel> {
    this.surveyId = surveyId
    return await Promise.resolve(this.survey)
  }
}
