import { SurveyModel } from '@/domain/models/survey'
import { AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import faker from 'faker'

export const mockSurveyModel = (): SurveyModel => ({
  id: faker.datatype.uuid(),
  question: faker.lorem.word(),
  answers: [{
    answer: faker.lorem.word()
  }, {
    answer: faker.lorem.word(),
    image: faker.image.imageUrl()
  }],
  date: faker.date.recent()
})

export const mockSurveyModels = (): SurveyModel[] => {
  return [{
    id: faker.datatype.uuid(),
    question: faker.lorem.word(),
    answers: [{
      image: faker.image.imageUrl(),
      answer: faker.lorem.word()
    }],
    date: faker.date.recent()
  }, {
    id: faker.datatype.uuid(),
    question: faker.lorem.word(),
    answers: [{
      image: faker.image.imageUrl(),
      answer: faker.lorem.word()
    }],
    date: faker.date.recent()
  }]
}

export const mockAddSurveyParams = (): AddSurveyParams => ({
  question: faker.lorem.word(),
  answers: [{
    image: faker.image.imageUrl(),
    answer: faker.lorem.word()
  },
  {
    answer: faker.lorem.word()
  },
  {
    image: faker.image.imageUrl(),
    answer: faker.lorem.word()
  }],
  date: faker.date.recent()
})
