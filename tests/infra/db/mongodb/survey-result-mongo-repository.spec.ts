
import { MongoHelper, SurveyResultMongoRepository } from '@/infra/db/mongodb'
import { SurveyModel } from '@/domain/models'
import { mockAddAccountParams, mockAddSurveyParams } from '@/tests/domain/mocks'

import { Collection, ObjectId } from 'mongodb'
import faker from 'faker'

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

const makeSut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository()
}

const mockSurvey = async (): Promise<SurveyModel> => {
  const res = await surveyCollection.insertOne(mockAddSurveyParams())

  return MongoHelper.map(res.ops[0])
}

const mockAccountId = async (): Promise<string> => {
  const res = await accountCollection.insertOne(mockAddAccountParams())

  return res.ops[0]._id
}

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    await surveyResultCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('save()', () => {
    test('Should add a survey result if its new', async () => {
      const survey = await mockSurvey()
      const accountId = await mockAccountId()
      const sut = makeSut()
      await sut.save({
        surveyId: survey.id,
        accountId,
        answer: survey.answers[0].answer,
        date: faker.date.recent()
      })
      const surveyResult = await surveyResultCollection.findOne({
        surveyId: survey.id,
        accountId
      })
      expect(surveyResult).toBeTruthy()
    })

    test('Should update survey result if its not new', async () => {
      const survey = await mockSurvey()
      const accountId = await mockAccountId()
      await surveyResultCollection.insertOne({
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(accountId),
        answer: survey.answers[0].answer,
        date: faker.date.recent()
      })
      const sut = makeSut()
      await sut.save({
        surveyId: survey.id,
        accountId,
        answer: survey.answers[1].answer,
        date: faker.date.recent()
      })
      const surveyResult = await surveyResultCollection.find({
        surveyId: survey.id,
        accountId
      }).toArray()
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.length).toEqual(1)
    })
  })

  describe('loadBySurveyId', () => {
    test('Should load survey result', async () => {
      const survey = await mockSurvey()
      const accountId = await mockAccountId()
      const accountId2 = await mockAccountId()
      await surveyResultCollection.insertMany([{
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(accountId),
        answer: survey.answers[0].answer,
        date: faker.date.recent()
      }, {
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(accountId2),
        answer: survey.answers[0].answer,
        date: faker.date.recent()
      }])
      const sut = makeSut()
      const surveyResult = await sut.loadBySurveyId(survey.id, accountId)
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId).toEqual(survey.id)
      expect(surveyResult.answers[0].count).toBe(2)
      expect(surveyResult.answers[0].percent).toBe(100)
      expect(surveyResult.answers[0].isCurrentAccountAnswer).toBe(true)
      expect(surveyResult.answers[1].count).toBe(0)
      expect(surveyResult.answers[1].percent).toBe(0)
      expect(surveyResult.answers[1].isCurrentAccountAnswer).toBe(false)
    })

    test('Should return null if there is no survey result', async () => {
      const survey = await mockSurvey()
      const accountId = await mockAccountId()
      const sut = makeSut()
      const surveyResult = await sut.loadBySurveyId(survey.id, accountId)
      expect(surveyResult).toBeNull()
    })
  })
})
