import { prisma } from "@/lib/prisma";
import { ClientsRepository } from "../clients-repository";
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

export class PrismaClientsRepository implements ClientsRepository {
  async findByEmail(email: string) {
    const client = await prisma.client.findUnique({
      where : {
        email
      }
    })

    return client
  }
  async findByCnpj(cnpj: string) {
    const client = await prisma.client.findUnique({
      where : {
        cnpj
      } 
    })
    return client
  }
  async register(data: RegisterUseCaseRequest) {
    const client = await prisma.client.create({
      data
    })

    return client
  }
  async update(data: updateClientRequest) {
    const { email,id,phone } = data
    const client = await prisma.client.update({
      where: {
        id
      },
      data : {
        email,
        phone,
        updated_at : new Date()
      }
    })

    return client
  }

  async delete(id: string) {
    await prisma.client.delete({ where : { id }})
  }

  async findById(id: string) {
    const client = await prisma.client.findUnique({ where : { id }})
    return client
  }

  async getAllClients() {
    const clients = await prisma.client.findMany()
    return clients
  }
  
}