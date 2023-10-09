import { ClientsRepository } from "@/repositories/clients-repository";
import { ResourceNotFound } from "../erros/resource-not-found-error";

export class GetClientById {
  constructor(private clientsRepository:ClientsRepository) {}

  async execute(id:string) {
    const client = await this.clientsRepository.findById(id)
    if(!client) {
      throw new ResourceNotFound()
    }

    return client
  }
}