import { IUser } from "./user"
import { CandidateData } from "../repositories/protocols/candidate-repository"
import { PrismaCandidateRepository } from "../repositories/prisma/prisma-candidate-repository"

export class Candidate extends IUser {
    private readonly cpf: String
    private readonly gender: String
    private readonly training: String // Formação
    private readonly experiences: String

    private readonly candidateRepository: PrismaCandidateRepository

    constructor(name: String, email: String, password: String, phoneNumber: String, address: String, cpf: String, gender: String, training: String, experiences: String, candidateRepository: PrismaCandidateRepository) {
        super(name, email, password, phoneNumber, address)

        this.cpf = cpf
        this.gender = gender
        this.training = training
        this.experiences = experiences

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

    public getExperiences() {
        return this.experiences
    }

    public add(data: CandidateData) {
        return this.candidateRepository.create(data)
    }

    public get() {
        return this.candidateRepository.getAll()
    }
}