import { Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { prisma } from "@/lib/prisma";

interface UpdateUserRequest {
  role: "ADMIN" | "COMMOM";
  office: string;
  email: string;
  password_hash: string;
  id:string;
}

export class PrismaUsersRepository implements UsersRepository {

  async findByCpf(cpf: string) {
    const data = await prisma.user.findUnique({
      where : {
        cpf_number : cpf
      }
    })

    return data
  }

  async findByEmail(email: string) {
    const data = await prisma.user.findUnique({
      where : {
        email
      }
    })

    return data
  }

  async findByWorkerCardNumber(workerCardNumber: string) {
    const data = await prisma.user.findUnique({
      where : {
        work_card_number : workerCardNumber
      }
    })

    return data
  }

  async register(data: Prisma.UserCreateInput){
    const user = await prisma.user.create({
      data
    })

    return user
  }

  async delete(id: string){
    await prisma.user.delete({
      where : {
        id
      }
    })
  }
  async update(data: UpdateUserRequest){
    const { email,id,office,password_hash,role } = data
    const user = await prisma.user.update({
      where : {
        id
      },
      data : {
        email,
        office,
        password_hash,
        role,
        updated_at : new Date()
      }
    })
    return user
  }

  async findById(id: string){
    
    const user = await prisma.user.findUnique({
      where : {
        id
      }
    })

    return user
  }
  

  async getAllUsersList(){
    const users = await prisma.user.findMany()
    return users
  }
  
}