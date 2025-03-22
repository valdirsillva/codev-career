import { Candidate } from "@/models/candidate"
import { CandidateParams } from "@/repositories/protocols/candidate-repository"

export class CandidateViewModel {
  constructor(private readonly candidate: Candidate) { }

  public get() {
    return this.candidate.getAllCandidates()
  }

  public create(data: CandidateParams) {
    return this.candidate.add(data)
  }
}