import { Company } from "../models/Company"
import { CompanyModel } from "../repositories/company-repository"
import { UserCompany } from "../repositories/protocols/company-repository"

export class CompanyViewModel {
  constructor(private readonly company: Company) { }

  public get() {
    return this.company.get()
  }

  public create(data: UserCompany) {
    return this.company.add(data)
  }
}


