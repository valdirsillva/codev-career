import * as dotenv from 'dotenv'
import cors from '@fastify/cors'
import Fastify from "fastify"
import fastifyJwt from '@fastify/jwt'

import { auth } from '@/views/routes/auth-route'
import { company } from '@/views/routes/company-route'
import { candidate } from '@/views/routes/candidate-route'
import { experience } from '@/views/routes/experience-route'
import { authMiddleware } from '@/middleware/auth.middleware'
import { application } from '@/views/routes/application-route'
import 'module-alias/register'
import { vacancy } from './views/routes/vacancy-route'
import fastifyStatic from '@fastify/static'
import path from "path"
import { fastifyMultipart } from '@fastify/multipart'

dotenv.config()

const app = Fastify({
  logger: true,
  trustProxy: false,
})
app.register(fastifyStatic, {
  root: path.resolve(__dirname, "../public"), 
  prefix: "/static/",
})

app.register(fastifyMultipart)
app.register(fastifyJwt, {
  secret: 'meutokensecreto'
})

app.decorate('authenticate', authMiddleware);

app.register(cors, {
  origin: "*",
  methods: ['GET', 'POST', 'PUT', 'DELETE']
})

// Register routes
app.register(auth)
app.register(company)
app.register(vacancy)
app.register(candidate)
app.register(experience)
app.register(application)

app.listen({ port: 9001, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`http:localhost:9001`)
})

console.log("Caminho absoluto da pasta public:", path.join(__dirname, "public"))

export default app