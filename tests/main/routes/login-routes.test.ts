import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb'

import request from 'supertest'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'

let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'any_name',
          email: 'any_email@mail.com',
          password: 'any_password',
          passwordConfirmation: 'any_password'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('valid_password', 12)
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'valid_email@mail.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'valid_email@mail.com',
          password: 'valid_password'
        })
        .expect(200)
    })

    test('Should return 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'valid_email@mail.com',
          password: 'valid_password'
        })
        .expect(401)
    })
  })
})
