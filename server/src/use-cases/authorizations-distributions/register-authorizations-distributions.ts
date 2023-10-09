import { AuthorizationsDistributionsRepository } from "@/repositories/authotizations-distributions-repository";
import { ClientsRepository } from "@/repositories/clients-repository";
import { SectorsRepository } from "@/repositories/sectors-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "../erros/invalid-credentials-error";

interface CreateAuthorizationsDistributionsType {
  value_of_thousand_in_cents: number;
  user_created_id : string;
  client_created_id:string;
  sectorsOfDistributions : string[]
}


export class RegisterAuthorizationsDistribtuionsUseCase {
  constructor ( 
    private usersRepository : UsersRepository,
    private sectorsRepository : SectorsRepository,
    private clientsRepository : ClientsRepository,
    private authorizationsDistributionsRepository : AuthorizationsDistributionsRepository
  ) {}

  async execute(data : CreateAuthorizationsDistributionsType) {
    const userExists = await this.usersRepository.findById(data.user_created_id)
    if(!userExists) {
      throw new InvalidCredentialsError()
    }

    const clientsExists = await this.clientsRepository.findById(data.client_created_id)
    if(!clientsExists) {
      throw new InvalidCredentialsError()
    }
 
    let isValid = true

    for(const i of data.sectorsOfDistributions ) {
      const response = await this.sectorsRepository.getById(i)
      if(!response) isValid = false
    }

    if(!isValid) {
      throw new InvalidCredentialsError()      
    }

    const authorizationCreated = await this.authorizationsDistributionsRepository.register(data)
    return authorizationCreated
  }
}