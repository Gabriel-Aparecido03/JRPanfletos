import { UsersRepository } from "@/repositories/users-repository";

export class GetAllUsersUseCase {
  constructor(private usersRepository:UsersRepository) {}

  async execute() {
    const users = await this.usersRepository.getAllUsersList()
    return users
  }
}