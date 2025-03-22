import { Company } from '@/models/company'
import { CompanyViewModel } from '@/viewmodel/company-view-model'
import { PrismaCompanyRepository } from '@/repositories/prisma/prisma-company-repository'
import { CompanyParams } from '@/repositories/protocols/company-repository'
import { CompanyView } from '../company-view'

export const makeCompanyFactory = (): CompanyView => {
  const User = {
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
  }
    
  const companyParams: CompanyParams = {
    name: '',
    cnpj: '',
    description: '',
    sector: '',
    ...User
  }

  const companyViewModel = new CompanyViewModel(
    new Company(companyParams,  new PrismaCompanyRepository())
  )
  return new CompanyView(companyViewModel)
}