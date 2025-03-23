
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
  description: string | null
  salary: string
  requirements: string
  companyId: string
  sector?: string | null
}


export interface VacancyRepository {
  add: (data: VacancyModel) => Promise<void>
  getAll: () => Promise<VacancyModel[]>
  findVacancyById: (id: string) => Promise<ResponseVacancy>
  findVacancyOfCompanyById: (id: string) => Promise<ResponseVacancy[]>
}
