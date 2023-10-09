import { prisma } from "@/lib/prisma";
import { ReportsDistributionsRepository } from "../reports-distributions-repository";

interface CreateReportDistributionType {
  first_photo_url: string;
  second_photo_url: string;
  third_photo_url: string;
  authorization_id : string;
  user_created_id : string;
}

export class PrismaReportsDistributionsRepository implements ReportsDistributionsRepository {

  async register(data: CreateReportDistributionType) {
    const report = await prisma.reportsDistributions.create({
      data
    })

    return report
  }

  async delete(id: string) {
    await prisma.reportsDistributions.delete({
      where : { id }
    })
  }

  async getAll() {
    const reports = await prisma.reportsDistributions.findMany()
    return reports
  }

  async getById(id: string) {
    const reports = await prisma.reportsDistributions.findUnique({
      where : { id }
    })
    return reports
  }
  async getByAuthorizationId(authorizationId: string) {
    const reports = await prisma.reportsDistributions.findUnique({
      where : { 
        authorization_id : authorizationId
       }
    })
    return reports
  }
  
}