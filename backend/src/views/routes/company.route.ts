import { FastifyInstance } from 'fastify';
import { JobModel } from '../../models/Job';
import { CompanyModel } from '../../models/Company';
import { JobViewModel } from '../../viewmodel/JobViewModel';
import { CompanyView } from '../CompanyView';
import { JobView } from '../../views/JobView'
import { CompanyViewModel } from "../../viewmodel/CompanyViewModel";

export async function company(app: FastifyInstance) {
  const instanceCompany = {
    name: '',
    cnpj: '',
    email: '',
    password: ''
  }

  const instanceJob = {
    job_title: '',
    job_companyId: '',
    job_quantity: '',
    technologies: '',
    salary: '',
    modality: '',
    seniority: '',
    requirements: '',
    details: '',
  }
  const companyModel = new CompanyModel(instanceCompany)
  const controllerCompany = new CompanyViewModel(companyModel)
  const viewCompany = new CompanyView(controllerCompany)

  const jobModel = new JobModel(instanceJob)
  const controllerJob = new JobViewModel(jobModel)
  const viewJob = new JobView(controllerJob)

  app.get('/companies', viewCompany.get.bind(viewCompany))
  app.post('/companies', viewCompany.create.bind(viewCompany))

  app.get('/jobs', viewJob.get.bind(viewJob))
  app.post('/jobs', viewJob.create.bind(viewJob))

  return app;

}
