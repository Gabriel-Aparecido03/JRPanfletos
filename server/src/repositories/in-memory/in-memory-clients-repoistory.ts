import { Client, Prisma } from "@prisma/client";
import { ClientsRepository } from "../clients-repository";
import { randomUUID } from "crypto";


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

export class InMemoryClientsRepository implements ClientsRepository {

  public items:Client[] = []

  async register(data: RegisterUseCaseRequest){
    const client : Client = {
      created_at : new Date(),
      email : data.email,
      id : randomUUID(),
      phone : data.phone,
      socialName : data.socialName,
      updated_at : null,
      user_created_id : "",
      cnpj : data.cnpj
    }
    this.items.push(client)
    return client
  }
  async update(data: updateClientRequest){
    const clientSelected = this.items.findIndex(item => item.id === data.id)

    const { email,phone }  = data

    this.items[clientSelected].email = email
    this.items[clientSelected].phone = phone

    return this.items[clientSelected]
  }

  async delete(id: string){
    const clientIndex = this.items.findIndex(item => item.id === id)
    const filteClientsList = this.items.splice(clientIndex,1)
    this.items = filteClientsList
  }

  async findById(id: string){
    const client = this.items.find(item => item.id === id)
    if(!client) return null
    return client
  }

  async findByEmail(email: string){
    const client = this.items.find(item => item.email === email)
    if(!client) return null
    return client
  }

  async findByCnpj(cnpj: string){
    const client = this.items.find(item => item.cnpj === cnpj)
    if(!client) return null
    return client
  }

  async searchMany(type: "email" | "phone" | "cnpj", query: string) {
    const clients = this.items.filter(item => item[type].includes(query))
    return clients
  }

  async getAllClients(){
    return this.items
  }

}