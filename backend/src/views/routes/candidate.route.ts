import { FastifyInstance } from "fastify"
import { CandidateView } from "../candidate-view"
import { Candidate } from "../../models/candidate"
import { CandidateViewModel } from "../../viewmodel/candidate-view-model"
import { PrismaCandidateRepository } from "../../repositories/prisma/prisma-candidate-repository"

export async function candidate(app: FastifyInstance) {
    const candidate = {
        name: '',
        email: '',
        experiences: ''
    }

    const viewModelCandidate = new Candidate(candidate, new PrismaCandidateRepository())
    const candidateView = new CandidateViewModel(viewModelCandidate)
    const viewCandidate = new CandidateView(candidateView)

    app.get("/api/candidatos", viewCandidate.get.bind(viewCandidate))
    app.post("/api/candidatos", viewCandidate.create.bind(viewCandidate))

    return app;
}