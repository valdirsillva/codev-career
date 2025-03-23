import { ResponseExperience } from "@/repositories/protocols/experience-repository"

export class ExperienceMapper {
  static toExperienceDTO(experiences: any[]): ResponseExperience[] {
    return experiences.map((item) => ({
      id: item.id,
      employee: item.employee,
      jobPosition: item.jobPosition,
      currentVacancy: item.currentVacancy,
      admissionalDate: item.admissionalDate,
      demissionalDate: item.demissionalDate,
      description: item.description,
      skills: item.skills,
      candidateId: item.candidate.userId,
    }))
  }
}

