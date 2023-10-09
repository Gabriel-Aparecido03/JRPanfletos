import { ReportsDistributionsRepository } from "@/repositories/reports-distributions-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "../erros/invalid-credentials-error";
import { AuthorizationsDistributionsRepository } from "@/repositories/authotizations-distributions-repository";

interface CreateReportDistributionType {
  first_photo_url: string;
  second_photo_url: string;
  third_photo_url: string;
  authorization_id : string;
  user_created_id : string;
}

export class RegisterReportDistributionsUseCase {
  constructor ( 
    private reportDistributionRepository : ReportsDistributionsRepository,
    private usersRepository : UsersRepository,
    private authorizationsDistributionsRepository : AuthorizationsDistributionsRepository
  ) {}

  async execute(data : CreateReportDistributionType) {
    const usersExists = await this.usersRepository.findById(data.user_created_id)
    if(!usersExists) {
      throw new InvalidCredentialsError()
    }

    const auhtorizationExists = await this.authorizationsDistributionsRepository.getById(data.authorization_id)
    if(!auhtorizationExists) {
      throw new InvalidCredentialsError()
    }

    const report = await this.reportDistributionRepository.register(data)
    return report
  }
}