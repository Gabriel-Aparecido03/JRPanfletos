import { ClientsRepository } from "@/repositories/clients-repository";
import { ResourceNotFound } from "../erros/resource-not-found-error";
import { InvalidCredentialsError } from "../erros/invalid-credentials-error";
import { UsersRepository } from "@/repositories/users-repository";

export class DeleteClientUseCase {
  constructor ( 
    private clientRepository : ClientsRepository
    ) {}

  async execute(id : string) {
    const isValidId = await this.clientRepository.findById(id)
    if(!isValidId) {
      throw new InvalidCredentialsError()
    }
    await this.clientRepository.delete(id)
  }
}