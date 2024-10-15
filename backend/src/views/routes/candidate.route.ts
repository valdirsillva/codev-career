import { FastifyInstance } from "fastify"
import { makeCandidateFactory } from "@/views/factories/candidate-factory"

export async function candidate(app: FastifyInstance) {
    const viewCandidate = makeCandidateFactory()

    app.get("/api/candidatos", viewCandidate.get.bind(viewCandidate))
    app.post("/api/candidatos", viewCandidate.create.bind(viewCandidate))

    return app;
}