import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "../erros/invalid-credentials-error";
import { compare } from "bcryptjs";

interface UserAuthenticatedProps {
  email : string
  passoword : string
}

export class AuthenticateUserUseCase {
  constructor(private userRepository : UsersRepository) {}

  async execute({ email,passoword }:UserAuthenticatedProps) {
    const user = await this.userRepository.findByEmail(email)
    if(!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(passoword,user.password_hash)
    if(!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return user 
  }
}