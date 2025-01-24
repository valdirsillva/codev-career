
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
  add: (data: VacancyModel) => Promise<VacancyModel>
  getAll: () => Promise<VacancyModel[]>
  findVacancyById: (id: string) => Promise<ResponseVacancy>
  findVacancyOfCompanyById: (id: string) => Promise<ResponseVacancy[]>
}
