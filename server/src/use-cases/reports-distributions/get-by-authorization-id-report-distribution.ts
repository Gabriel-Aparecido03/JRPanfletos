import { ReportsDistributionsRepository } from "@/repositories/reports-distributions-repository";
import { InvalidCredentialsError } from "../erros/invalid-credentials-error";

export class GetByAuthorizationIdReportDistributionUseCase {
  constructor(private reportsDistributionRepository : ReportsDistributionsRepository) {}

  async execute(auhtorizationId:string) {
    const report = await this.reportsDistributionRepository.getByAuthorizationId(auhtorizationId)
    if(!report) {
      throw new InvalidCredentialsError()
    }

    return report
  }
}