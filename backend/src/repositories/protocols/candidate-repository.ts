export interface CandidateModel {
    name: string
    email: string
    experiences: string
}

export interface Candidate {
    create: (data: CandidateModel) => Promise<CandidateModel | undefined>
    getAll: () => Promise<CandidateModel[]>
}