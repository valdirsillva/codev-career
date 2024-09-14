import { Company } from "../models/company"
import { CompanyModel } from "../repositories/company-repository"

export class CompanyViewModel {
  constructor(private readonly company: Company) { }

  public get() {
    return this.company.getCompanies()
  }

  public create(data: CompanyModel) {
    return this.company.save(data)
  }
}


