import { Company } from "@/models/company"
import { CompanyView } from "@/views/company-view"
import { CompanyViewModel } from "@/viewmodel/company-view-model"
import { PrismaCompanyRepository } from "@/repositories/prisma/prisma-company-repository"

export const makeCompanyFactory = () => {
    const repository = new PrismaCompanyRepository()
    const companyModel = new Company('', '', '', '', '', '', '', '', repository)
    const companyViewModel = new CompanyViewModel(companyModel)
    return new CompanyView(companyViewModel)
}