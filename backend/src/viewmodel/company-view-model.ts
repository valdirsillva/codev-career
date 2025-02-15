import { Company } from "@/models/company"
import { CompanyParams } from "@/repositories/protocols/company-repository"

export class CompanyViewModel {
  constructor(private readonly company: Company) { }

  public get() {
    return this.company.get()
  }

  public getById(id: string) {
    return this.company.getCompanyById(id)
  }

  public create(data: CompanyParams) {
    return this.company.add(data)
  }
}


