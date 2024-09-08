
export interface Vacancy {
  id?: string
  title: string
  description: string
  location: string
  salary: string
  requirements: string
  companyId: string
}

export interface VacancyRepository {
  create: (data: Vacancy) => Promise<Vacancy | {}>
  getAll: () => Promise<Vacancy[]>
}
