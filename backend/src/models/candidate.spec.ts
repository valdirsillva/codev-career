import { PrismaCandidateRepository } from '../repositories/prisma/prisma-candidate-repository'
import { CandidateParams } from '../repositories/protocols/candidate-repository'
import { Candidate } from './candidate'

type SutTypes = {
    fakeCandidate: CandidateParams,
    mockSaveCandidateRepository: Partial<PrismaCandidateRepository>
}

const fakeCandidate = {
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@gmail.com',
    password: 'any_password',
    phoneNumber: '',
    address: 'any_adress',
    cpf: 'any_cpf',
    gender: 'any_gender',
    training: '',
    education: '',
}

const makeSut = (): SutTypes => {
    const mockSaveCandidateRepository: Partial<PrismaCandidateRepository> = {
        create: jest.fn().mockResolvedValue({ id: 'any_id', ...fakeCandidate }),
    }
    return {
        fakeCandidate,
        mockSaveCandidateRepository
    }
}

describe('Model Candidate', () => {
    test('Should be able create a new candidate', () => {
        const { fakeCandidate, mockSaveCandidateRepository } = makeSut()
        const candidate = new Candidate(
            fakeCandidate,
            mockSaveCandidateRepository as PrismaCandidateRepository
        )

        expect(candidate).toBeTruthy();
        expect(mockSaveCandidateRepository.create).not.toHaveBeenCalled();
    })

    test('Should call save method when creating a candidate', async () => {
        const { fakeCandidate, mockSaveCandidateRepository } = makeSut()
        const candidate = new Candidate(
            fakeCandidate,
            mockSaveCandidateRepository as PrismaCandidateRepository
        )

        const response = await candidate.add(fakeCandidate);
        expect(response).toBeTruthy();
    })
})