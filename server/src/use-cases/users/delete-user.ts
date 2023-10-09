import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "../erros/invalid-credentials-error";

interface DeleteUserInterface {
  id : string;
  user_action_id : string;
}

export class DeleteUserUseCase {
  constructor(private usersRepository:UsersRepository) {}

  async execute( { id , user_action_id }:DeleteUserInterface) {
    const doesUserExists = await this.usersRepository.findById(id)

    if(!doesUserExists) {
      throw new InvalidCredentialsError()
    }

    const isAuthorizateToDelrte = await this.usersRepository.findById(user_action_id)
    if(!isAuthorizateToDelrte || isAuthorizateToDelrte.role === "COMMOM") {
      throw new InvalidCredentialsError()
    }

    await this.usersRepository.delete(id)
  }
}