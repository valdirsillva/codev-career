import { Candidate } from "../models/candidate"
import { CandidateData } from "../repositories/protocols/candidate-repository"

export class CandidateViewModel {
    constructor(private readonly candidate: Candidate) { }

    public get() {
        return this.candidate.get()
    }

    public create(data: CandidateData) {
        return this.candidate.add(data)
    }
}