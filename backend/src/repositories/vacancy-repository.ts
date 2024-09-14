
export interface VacancyNodel {
  id?: string
  title: string
  description: string
  location: string
  salary: string
  requirements: string
  companyId: string
}

export interface Vacancy {
  create: (data: VacancyNodel) => Promise<VacancyNodel>
  getAll: () => Promise<VacancyNodel[]>
}
