import { CompanyModel } from "../models/Company";
import { Company } from "../repositories/CompanyRepository";

export class CompanyViewModel {
  private companyModel: CompanyModel;

  constructor(companyModel: CompanyModel) {
    this.companyModel = companyModel;
  }

  public get() {
    return this.companyModel.getCompanies();
  }

  public create(data: Company) {
    return this.companyModel.save(data);
  }
}


