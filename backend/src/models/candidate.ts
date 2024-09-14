import { PrismaCandidateRepository } from "../repositories/prisma/prisma-candidate-repository"
import { CandidateModel } from "../repositories/protocols/candidate-repository"

export class Candidate {
    private props: CandidateModel
    private repositoryCandidate: PrismaCandidateRepository

    constructor(props: CandidateModel, repositoryCandidate: PrismaCandidateRepository) {
        this.props = { ...props }
        this.repositoryCandidate = repositoryCandidate
    }

    public set name(name: string) {
        this.props.name = name
    }

    public set email(email: string) {
        this.props.email = email
    }

    public set experiences(experiences: string) {
        this.props.experiences = experiences
    }

    public get name() {
        return this.props.name
    }

    public get email() {
        return this.props.email
    }

    public get experiences() {
        return this.props.experiences
    }

    public save(data: CandidateModel) {
        return this.repositoryCandidate.create(data)
    }

    public getAll() {
        return this.repositoryCandidate.getAll()
    }
}