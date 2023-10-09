import { AuthorizationsDistributionsRepository } from "@/repositories/authotizations-distributions-repository";
import { ResourceNotFound } from "../erros/resource-not-found-error";


export class GetAllAuthorizationsDistribtuionsUseCase {
  constructor ( 
    private authorizationsDistributionsRepository : AuthorizationsDistributionsRepository
  ) {}

  async execute() {
    const authorizations = await this.authorizationsDistributionsRepository.getAll()
    return authorizations
  }
}