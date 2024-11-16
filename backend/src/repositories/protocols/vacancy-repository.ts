
export interface VacancyModel {
  id?: string
  title: string
  description: string
  salary: string
  requirements: string
  companyId: string
}

export interface Vacancy {
  create: (data: VacancyModel) => Promise<VacancyModel>
  getAll: () => Promise<VacancyModel[]>
  getById: (id: string) => Promise<VacancyModel>
}
