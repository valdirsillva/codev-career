
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

export interface Jobs {
  jobs: JobProps[]
}

export interface JobRepository {
  create: (data: JobProps) => Promise<JobProps | {}>
  getAll: () => Promise<Jobs | {}>
}

