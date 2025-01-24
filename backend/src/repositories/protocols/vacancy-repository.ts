
export interface VacancyModel {
  id?: string
  title: string
  description: string
  salary: string
  requirements: string
  companyId: string
}

export interface ResponseVacancy {
  id: string
  title: string
  description: string
  salary: string
  requirements: string
  companyId: string
}
export interface VacancyRepository {
  create: (data: VacancyModel) => Promise<VacancyModel>
  getAll: () => Promise<VacancyModel[]>
  findVacancyOfCompanyById: (id: string) => Promise<ResponseVacancy[]>
}
