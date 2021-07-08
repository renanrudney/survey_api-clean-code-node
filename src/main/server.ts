import 'module-alias/register'
import { MongoHelper } from '@/infra/db/mongodb'
import env from '@/main/config/env'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    const port: string | number = env.port
    app.listen(env.port, () => console.log(`Server running at http://localhost:${port}`))
  })
  .catch(console.error)
