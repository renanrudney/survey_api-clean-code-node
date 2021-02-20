import { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { AddSurveyParams } from '@/data/usecases/survey/add-survey/db-add-survey-protocols'
import { mockSurveyModel, mockSurveyModels } from '@/domain/test'
import { LoadSurveyByIdRepository } from '../protocols/db/survey/load-survey-by-id-repository'
import { LoadSurveysRepository, SurveyModel } from '../usecases/survey/load-surveys/db-load-surveys-protocols'

export const mockAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (_surveyData: AddSurveyParams): Promise<void> {
      return null
    }
  }
  return new AddSurveyRepositoryStub()
}

export const mockLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (_id: string): Promise<SurveyModel> {
      return await Promise.resolve(mockSurveyModel())
    }
  }
  return new LoadSurveyByIdRepositoryStub()
}

export const mockLoadSurveysRepository = (): LoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll (): Promise<SurveyModel[]> {
      return await Promise.resolve(mockSurveyModels())
    }
  }
  return new LoadSurveysRepositoryStub()
}
