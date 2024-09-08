import { PrismaJobRepository } from "../repositories/prisma/PrismaJobRepository"

export interface JobProps {
  job_title: string
  job_companyId: string
  job_quantity: string
  technologies: string
  salary: string
  modality: string
  seniority: string
  requirements: string
  details: string
}

export class JobModel {
  private props: JobProps
  private repositoryJobs: PrismaJobRepository

  constructor(props: JobProps) {
    this.repositoryJobs = new PrismaJobRepository()

    this.props = { ...props }
  }

  public set jobTitle(title: string) {
    this.props.job_title = title
  }

  public set tecnologies(tecnologies: string) {
    this.props.technologies = tecnologies
  }

  public set jobCompanyId(companyId: string) {
    this.props.job_companyId = companyId
  }

  public set jobQuantity(jobQuantity: string) {
    this.props.job_quantity = jobQuantity
  }

  public set salary(salary: string) {
    this.props.salary = salary
  }

  public set modality(modality: string) {
    this.props.modality = modality
  }

  public set seniority(seniority: string) {
    this.props.seniority = seniority
  }

  public set requirements(requirement: string) {
    this.props.requirements = requirement
  }

  public set details(detail: string) {
    this.props.details = detail
  }

  public get jobTitle() {
    return this.props.job_title
  }

  public get tecnologies() {
    return this.props.technologies
  }

  public get jobCompanyId() {
    return this.props.job_companyId
  }

  public get jobQuantity() {
    return this.props.job_quantity
  }

  public get salary() {
    return this.props.salary
  }

  public get modality() {
    return this.props.modality
  }

  public get seniority() {
    return this.props.seniority
  }

  public get requirements() {
    return this.props.requirements
  }

  public get details() {
    return this.props.details
  }

  public save(data: JobProps) {
    return this.repositoryJobs.create(data)
  }
  public getJobs() {
    return this.repositoryJobs.getAll()
  }
}