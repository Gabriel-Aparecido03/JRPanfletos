import { AuthorizationsDistributionsRepository } from "@/repositories/authotizations-distributions-repository";
import { ClientsRepository } from "@/repositories/clients-repository";
import { SectorsRepository } from "@/repositories/sectors-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "../erros/invalid-credentials-error";
import { ResourceNotFound } from "../erros/resource-not-found-error";

interface CreateAuthorizationsDistributionsType {
  value_of_thousand_in_cents: number;
  user_created_id : string;
  client_created_id:string;
  sectorsOfDistributions : string[]
}


export class DeleteAuthorizationsDistribtuionsUseCase {
  constructor ( 
    private authorizationsDistributionsRepository : AuthorizationsDistributionsRepository
  ) {}

  async execute(id : string) {
    const authorization = await this.authorizationsDistributionsRepository.getById(id)
    if(!authorization) {
      throw new ResourceNotFound()
    }

    await this.authorizationsDistributionsRepository.delete(id)
  }
}