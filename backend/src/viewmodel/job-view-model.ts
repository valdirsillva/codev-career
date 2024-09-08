import { JobModel } from "../models/job"
import { JobProps } from "../repositories/job-repository"

export class JobViewModel {
  constructor(private readonly jobModel: JobModel) { }

  public get() {
    return this.jobModel.getJobs()
  }

  public create(data: JobProps) {
    return this.jobModel.save(data)
  }
}


