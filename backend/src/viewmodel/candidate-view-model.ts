import { Candidate } from "../models/candidate";
import { CandidateModel } from "../repositories/protocols/candidate-repository";

export class CandidateViewModel {
    constructor(private readonly candidate: Candidate) { }

    public get() {
        return this.candidate.getAll()
    }

    public create(data: CandidateModel) {
        return this.candidate.save(data)
    }
}