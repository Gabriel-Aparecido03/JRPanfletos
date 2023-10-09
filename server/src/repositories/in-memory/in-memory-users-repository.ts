import {  Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { randomUUID } from "crypto";
import { hash } from "bcryptjs";

interface UpdateUserRequest {
  role: "ADMIN" | "COMMOM";
  office: string;
  email: string;
  password_hash: string;
  id:string;
}

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(id: string) {
    const user = this.items.find(item => item.id === id)
    if(!user) return null
    return user
  }

  async findByCpf(cpf: string) {
    const user = this.items.find(item => item.cpf_number === cpf)
    if(!user) return null
    return user
  }
  
  async findByEmail(email: string) {
    const user = this.items.find(item => item.email === email)
    if(!user) return null
    return user
  }

  async findByWorkerCardNumber(workerCardNumber: string) {
    const user = this.items.find(item => item.work_card_number === workerCardNumber)
    if(!user) return null
    return user
  }

  async register(data: Prisma.UserCreateInput) {

    const { cpf_number,email,name,office,password_hash,work_card_number,role } = data

    const user:User = {
      cpf_number,
      created_at: new Date(),
      email,
      id: randomUUID(),
      name,
      office,
      password_hash,
      role: role ?? "COMMOM",
      work_card_number,
      updated_at : null
    }
    this.items.push(user)
    return user
  }

  async update(data: UpdateUserRequest) {

    const userSelected = this.items.findIndex(item => item.id === data.id)

    const { email,office,password_hash,role }  = data

    this.items[userSelected].email = email
    this.items[userSelected].office = office
    this.items[userSelected].password_hash = await hash(password_hash,6)
    this.items[userSelected].role = role
    this.items[userSelected].updated_at = new Date()

    return this.items[userSelected]
  }

  async delete(id: string) {
    const userIndex = this.items.findIndex(item => item.id === id)
    const filteredUsersList = this.items.splice(userIndex,1)
    this.items = filteredUsersList
  }

  async getAllUsersList() {
    return this.items
  }
}