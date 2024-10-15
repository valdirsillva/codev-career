import { CandidateView } from "@/views/candidate-view"
import { Candidate } from "@/models/candidate"
import { CandidateViewModel } from "@/viewmodel/candidate-view-model"
import { PrismaCandidateRepository } from "@/repositories/prisma/prisma-candidate-repository"

export const makeCandidateFactory = (): CandidateView => {
    const repository = new PrismaCandidateRepository()
    const viewModelCandidate = new Candidate('', '', '', '', '', '', '', '', '', repository)
    const candidateView = new CandidateViewModel(viewModelCandidate)
    return new CandidateView(candidateView)
}