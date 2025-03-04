import { User } from '@/models/user'
import { CandidateParams, CandidateRepository } from '@/repositories/protocols/candidate-repository'

export class Candidate extends User {
    private readonly cpf: string
    private readonly gender: string
    private readonly training: string // Formação

    private readonly candidateRepository: CandidateRepository

    constructor(data: CandidateParams, candidateRepository: CandidateRepository) {
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
        return this.candidateRepository.add(data)
    }

    public getAllCandidates() {
        return this.candidateRepository.getAll()
    }
}