
import faker from 'faker'
import { SurveyResultModel } from '@/domain/models'
import { SaveSurveyResult } from '@/domain/usecases'

export const mockSaveSurveyResultParams = (): SaveSurveyResult.Params => ({
  accountId: faker.datatype.uuid(),
  surveyId: faker.datatype.uuid(),
  answer: faker.lorem.word(),
  date: new Date()
})

export const mockSurveyResultModel = (): SurveyResultModel => ({
  surveyId: faker.datatype.uuid(),
  question: faker.lorem.word(),
  answers: [{
    answer: faker.lorem.word(),
    count: faker.datatype.number({ min: 0, max: 100 }),
    percent: faker.datatype.number({ min: 0, max: 100 }),
    isCurrentAccountAnswer: faker.datatype.boolean()
  }, {
    answer: faker.lorem.word(),
    image: faker.image.imageUrl(),
    count: faker.datatype.number({ min: 0, max: 100 }),
    percent: faker.datatype.number({ min: 0, max: 100 }),
    isCurrentAccountAnswer: faker.datatype.boolean()
  }],
  date: new Date()
})
