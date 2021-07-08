import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator, makeDbLoadSurveyById, makeDbSaveSurveyResult } from '@/main/factories'
import { SaveSurveyResultController } from '@/presentation/controllers'

export const makeSaveSurveyResultController = (): Controller => {
  const controller = new SaveSurveyResultController(makeDbLoadSurveyById(), makeDbSaveSurveyResult())
  return makeLogControllerDecorator(controller)
}
