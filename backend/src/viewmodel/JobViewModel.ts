import { JobModel } from "../models/Job";
import { JobProps } from "../repositories/JobRepository";

export class JobViewModel {
  private jobModel: JobModel;

  constructor(jobModel: JobModel) {
    this.jobModel = jobModel;
  }

  public get() {
    return this.jobModel.getJobs();
  }

  public create(data: JobProps) {
    return this.jobModel.save(data);
  }
}


