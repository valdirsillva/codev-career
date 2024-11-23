import { CandidateView } from "@/views/candidate-view"
import { Candidate } from "@/models/candidate"
import { CandidateViewModel } from "@/viewmodel/candidate-view-model"
import { PrismaCandidateRepository } from "@/repositories/prisma/prisma-candidate-repository"
import { CandidateParams } from "@/repositories/protocols/candidate-repository"

export const makeCandidateFactory = (): CandidateView => {
    const user = {
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
    }
    const candidate: CandidateParams = {
        cpf: '',
        gender:  '',
        training:'',
        education: '',
        ...user
    }
    const repository = new PrismaCandidateRepository()
    const viewModelCandidate = new Candidate(candidate, repository)
    const candidateView = new CandidateViewModel(viewModelCandidate)
    return new CandidateView(candidateView)
}