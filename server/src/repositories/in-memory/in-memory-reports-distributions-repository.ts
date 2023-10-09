import { ReportsDistributions } from "@prisma/client";
import { ReportsDistributionsRepository } from "../reports-distributions-repository";
import { randomUUID } from "crypto";

interface CreateReportDistributionType {
  first_photo_url: string;
  second_photo_url: string;
  third_photo_url: string;
  authorization_id : string;
  user_created_id : string;
}

export class InMemoryReportsDistributionsRepository implements ReportsDistributionsRepository {
  
  public items : ReportsDistributions[] = []

  async register({authorization_id,first_photo_url,second_photo_url,third_photo_url,user_created_id}: CreateReportDistributionType) {

    const report : ReportsDistributions = {
      authorization_id,
      first_photo_url,
      created_at : new Date(),
      id : randomUUID(),
      second_photo_url,
      third_photo_url,
      user_created_id
    }

    this.items.push(report)
    return report
  }

  async delete(id: string) {
    const reportIndex = this.items.findIndex(item => item.id === id)
    this.items.splice(reportIndex,1)
  }
  async getAll() {
    return this.items
  }

  async getById(id: string) {
    const report = this.items.find(item => item.id === id)
    if(!report) return null
    return report
  }

  async getByAuthorizationId(authorizationId: string) {
    const report = this.items.find(item => item.authorization_id === authorizationId)
    if(!report) return null
    return report
  }
  
}