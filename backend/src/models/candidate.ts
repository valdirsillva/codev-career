import { User } from "@/models/user"
import { CandidateParams } from "@/repositories/protocols/candidate-repository"
import { PrismaCandidateRepository } from "@/repositories/prisma/prisma-candidate-repository"

export class Candidate extends User {
    private readonly cpf: string
    private readonly gender: string
    private readonly training: string // Formação

    private readonly candidateRepository: PrismaCandidateRepository

    constructor(data: CandidateParams, candidateRepository: PrismaCandidateRepository) {
        const { name, email, password, phoneNumber, address } = data
        super(name, email, password, phoneNumber, address)

        this.cpf = data.cpf
        this.gender = data.gender
        this.training = data.training

        this.candidateRepository = candidateRepository
    }

    public getCpf() {
        return this.cpf
    }

    public getGender() {
        return this.gender
    }

    public getTraining() {
        return this.training
    }

    public add(data: CandidateParams) {
        return this.candidateRepository.create(data)
    }

    public getAllCandidates() {
        return this.candidateRepository.getAll()
    }
}