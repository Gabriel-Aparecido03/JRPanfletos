import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "../erros/invalid-credentials-error";
import { compare } from "bcryptjs";

interface UserAuthenticatedProps {
  email : string
  passoword : string
}

export class AuthenticateUserUseCase {
  constructor(private userRepository : UsersRepository) {}
  /**
   * Executes user authentication.
   * @param {UserAuthenticatedProps} params - The user authentication parameters.
   * @returns {Promise<User>} The authenticated user.
   * @throws {InvalidCredentialsError} Thrown if the user does not exist or if the password does not match.
   */
  async execute({ email,passoword }:UserAuthenticatedProps) {
    const user = await this.userRepository.findByEmail(email)
    // Validate if the user exists at database
    if(!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(passoword,user.password_hash)
    // Validate if the passoword match with user credentials
    if(!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return user 
  }
}