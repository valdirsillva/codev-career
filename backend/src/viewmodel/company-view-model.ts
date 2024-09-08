import { CompanyModel } from "../models/company"
import { Company } from "../repositories/company-repository"

export class CompanyViewModel {
  constructor(private readonly companyModel: CompanyModel) { }

  public get() {
    return this.companyModel.getCompanies()
  }

  public create(data: Company) {
    return this.companyModel.save(data)
  }
}


