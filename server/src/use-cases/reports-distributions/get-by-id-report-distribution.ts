import { ReportsDistributionsRepository } from "@/repositories/reports-distributions-repository";
import { InvalidCredentialsError } from "../erros/invalid-credentials-error";

export class GetByIdReportDistributionUseCase {
  constructor(private reportsDistributionRepository : ReportsDistributionsRepository) {}

  async execute(id:string) {
    const report = await this.reportsDistributionRepository.getById(id)
    if(!report) {
      throw new InvalidCredentialsError()
    }

    return report
  }
}