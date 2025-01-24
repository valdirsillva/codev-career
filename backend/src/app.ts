import * as dotenv from 'dotenv'
import cors from '@fastify/cors'
import Fastify from "fastify"
import { auth } from '@/views/routes/auth-route'
import { company } from '@/views/routes/company-route'
import { authMiddleware } from '@/middleware/auth.middleware'

import fastifyJwt from '@fastify/jwt'
import { candidate } from '@/views/routes/candidate-route'
import { experience } from '@/views/routes/experience-route'
import { application } from '@/views/routes/application-route'
import 'module-alias/register'

dotenv.config()

const app = Fastify({
  logger: false,
  trustProxy: false,
})

app.register(fastifyJwt, {
  secret: 'meutokensecreto'
})

app.decorate('authenticate', authMiddleware);

app.register(cors, {
  origin: "*"
})

// Register routes
app.register(auth)
app.register(company)
app.register(candidate)
app.register(experience)
app.register(application)

console.log(app.printRoutes())
// app.register(userRouter)
app.listen({ port: 9001, host: '0.0.0.0' }, () => {
  console.log(`http:localhost:9001`)
})

export default app