import { prisma } from "../../views/lib/prisma";
import { JobProps, JobRepository, Jobs } from "../JobRepository";

export class PrismaJobRepository implements JobRepository {
  async create(jobData: JobProps): Promise<JobProps | {}> {

    const job = await prisma.job.create({
      data: {
        ...jobData
      },
    })
    return job
  }

  async getAll(): Promise<Jobs | []> {
    const jobs = await prisma.job.findMany()
    return { jobs }
  }
}