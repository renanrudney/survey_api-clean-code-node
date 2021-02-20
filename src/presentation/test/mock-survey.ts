import { mockSurveyModel, mockSurveyModels } from '@/domain/test'
import { AddSurvey, AddSurveyParams } from '@/presentation/controllers/survey/add-survey/add-surver-controller-protocols'
import { LoadSurveyById } from '../controllers/survey-result/save-survey-result/save-survey-result-controller-protocols'
import { LoadSurveys, SurveyModel } from '../controllers/survey/load-surveys/load-surveys-controller-protocols'

export const mockAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add (_data: AddSurveyParams): Promise<void> {
      return await Promise.resolve()
    }
  }
  return new AddSurveyStub()
}

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return await Promise.resolve(mockSurveyModels())
    }
  }
  return new LoadSurveysStub()
}

export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (_id: string): Promise<SurveyModel> {
      return await Promise.resolve(mockSurveyModel())
    }
  }
  return new LoadSurveyByIdStub()
}
