import { ReportsDistributionsRepository } from "@/repositories/reports-distributions-repository";
import { InvalidCredentialsError } from "../erros/invalid-credentials-error";

export class DeleteReportDistributionUseCase {
  constructor(private reportsDistributionRepository : ReportsDistributionsRepository) {}

  async execute(id:string) {
    const ifExists = await this.reportsDistributionRepository.getById(id)
    console.log(ifExists)
    if(!ifExists) {
      throw new InvalidCredentialsError()
    }

    await this.reportsDistributionRepository.delete(id)
  }
}