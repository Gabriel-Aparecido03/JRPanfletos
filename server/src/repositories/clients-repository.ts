import { Client } from "@prisma/client";

interface updateClientRequest {
  id : string;
  email :string;
  phone : string;
}

interface RegisterUseCaseRequest {
  socialName: string;
  email: string;
  phone: string;
  cnpj: string;
  user_created_id: string;
}

export interface ClientsRepository {
  register(data:RegisterUseCaseRequest) : Promise<Client>
  update(data : updateClientRequest): Promise<Client>
  delete(id:string): Promise<void>

  findById(id:string): Promise<Client | null>
  findByEmail(email:string): Promise<Client | null>
  findByCnpj(cnpj:string): Promise<Client | null>

  getAllClients() : Promise<Client[]>
}