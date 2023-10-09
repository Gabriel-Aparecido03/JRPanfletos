import { ReportsDistributionsRepository } from "@/repositories/reports-distributions-repository";

export class GetAllReportDistributionUseCase {
  constructor(private reportsDistributionRepository : ReportsDistributionsRepository) {}

  async execute() {
    return await this.reportsDistributionRepository.getAll()
  }
}