import { prisma } from "../../views/lib/prisma";
import { Candidate, CandidateModel } from "../protocols/candidate-repository";

export class PrismaCandidateRepository implements Candidate {
    async create(candidate: CandidateModel): Promise<CandidateModel> {
        return await prisma.candidate.create({
            data: {
                name: candidate.name,
                email: candidate.email,
                experiences: candidate.experiences
            },
        })
    }

    async getAll(): Promise<CandidateModel[]> {
        const candidates = await prisma.candidate.findMany()
        return candidates
    }
}