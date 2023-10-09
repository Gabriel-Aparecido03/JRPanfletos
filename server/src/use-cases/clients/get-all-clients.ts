import { ClientsRepository } from "@/repositories/clients-repository";

export class GetAllClientsUseCase {
  constructor(private clientsRepository:ClientsRepository) {}

  async execute() {
    const clients = await this.clientsRepository.getAllClients()
    return clients
  }
}