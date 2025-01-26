import { CandidateResponse } from '@/repositories/protocols/candidate-repository'

export class CandidateMapper {
	static toCandidate(candidates: CandidateResponse[]) {
		return candidates.map((candidate) => ({
			id: candidate.id,
			cpf: candidate.cpf!,
			gender: candidate.gender!,
			education: candidate.education!,
			user: {
				id: candidate.user.id,
				name: candidate.user.name,
				email: candidate.user.email,
				password: candidate.user.password,
				phoneNumber: candidate.user.phoneNumber,
			}
		}))
	}
}