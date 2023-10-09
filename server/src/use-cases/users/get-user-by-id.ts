import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFound } from "../erros/resource-not-found-error";

export class GetUserByIdUseCase {
  constructor(private usersRepository:UsersRepository) {}

  async execute(id:string) {
    const user = await this.usersRepository.findById(id)
    if(!user) {
      throw new ResourceNotFound()
    }

    return user
  }
}