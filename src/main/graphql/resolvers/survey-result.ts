import { adaptResolver } from '@/main/adapters'
import { makeLoadSurveyResultController, makeSaveSurveyResultController } from '@/main/factories'

export default {
  Query: {
    surveyResult: async (_parent: any, args: any) => await adaptResolver(makeLoadSurveyResultController(), args)
  },
  Mutation: {
    saveSurveyResult: async (_parent: any, args: any) => await adaptResolver(makeSaveSurveyResultController(), args)
  }
}
