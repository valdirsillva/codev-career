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
        gender: '',
        training: '',
        education: '',
        name: user.name,
        email: user.email,
        password: user.password,
        phoneNumber: user.phoneNumber,
        address: user.address,
    }
    const repository = new PrismaCandidateRepository()
    const candidadeModel = new Candidate(candidate, repository)
    const candidateViewModel = new CandidateViewModel(candidadeModel)
    return new CandidateView(candidateViewModel)
}