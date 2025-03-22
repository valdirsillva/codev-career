import { PrismaApplicationRepository } from "@/repositories/prisma/prisma-application-repository"
import { ApplicationView } from "../application-view"
import { Application } from "@/models/application"
import { ApplicationViewModel } from "@/viewmodel/application-view-model"

export const makeApplicationFactory = (): ApplicationView => {
  const repositoryApplication = new PrismaApplicationRepository()
  const applicationModel = new Application('', '', repositoryApplication)
  const auth = new ApplicationViewModel(applicationModel)
  return new ApplicationView(auth)
}