import { FastifyInstance } from "fastify"
import { makeCandidateFactory } from "@/views/factories/candidate-factory"

export async function candidate(app: FastifyInstance) {
  const viewCandidate = makeCandidateFactory()

  app.get("/api/candidatos",  async (req, res) => viewCandidate.get(req, res))
  app.post("/api/candidatos", async (req, res) => viewCandidate.create(req, res))
  return app
}