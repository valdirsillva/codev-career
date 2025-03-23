import { CandidateResponseDTO } from '@/dtos/candidate-response-dto'
import { CandidateParams } from '@/repositories/protocols/candidate-repository'

export class CandidateMapper {
  static toCandidate(candidates: CandidateResponseDTO[]) {
    return candidates.map((candidate) => ({
      id: candidate.id,
      cpf: candidate.cpf ?? null, // Garante que cpf seja 'string | null'
      gender: candidate.gender ?? "N/A", // Garante que gender nunca seja null
      education: candidate.education ?? null,
      user: {
        id: candidate.user.id,
        name: candidate.user.name,
        email: candidate.user.email,
        phoneNumber: candidate.user.phoneNumber ?? null,
        address: candidate.user.address ?? null,
        city: candidate.user.city ?? null,
        state: candidate.user.state ?? null
      }
    }))
  }

  static toCandidateResponse(response: CandidateResponseDTO) {
    return {
      id: response.id,
      cpf: response.cpf ?? null,
      gender: response.gender ?? null,
      education: response.education ?? null,
      user: {
        name: response.user.name,
        email: response.user.email,
        phoneNumber: response.user.phoneNumber ?? null,
        address: response.user.address ?? null,
      }
    }
  }
}

