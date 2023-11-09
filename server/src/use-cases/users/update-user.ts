import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "../erros/invalid-credentials-error";
import { hash } from "bcryptjs";
 
interface UpdateUserRequest {
  id: string;
  office?: string | undefined;
  email?: string | undefined;
  role?: "ADMIN" | "COMMOM" | undefined;
  password?: string | undefined;
  user_action_id:string;
}

export class UpdateUserUseCase {
  constructor(private usersRepository:UsersRepository) {}

  async execute(data:UpdateUserRequest) {
    const userSelected = await this.usersRepository.findById(data.id)
    if(!userSelected) {
      throw new InvalidCredentialsError()
    }

    let objTransfer = {
      email: userSelected.email,
      id: data.id,
      office: userSelected.office,
      password_hash : userSelected.password_hash,
      role : data.role ?? "COMMOM"
    } 

    if(data.password) {
      const hashed = await hash(data.password,6)
      objTransfer.password_hash = hashed
    }
    
    if(data.office !== userSelected.office && data.office) {
      objTransfer.office = data.office
    }
    
    if(data.email) {
      const userSearched = await this.usersRepository.findByEmail(data.email)
      if(userSearched?.id !== data.id && userSearched?.email === data.email ) {
        throw new InvalidCredentialsError()
      }
      objTransfer.email = data.email
    }

    const isAuthorizateToDelrte = await this.usersRepository.findById(data.user_action_id)
    if(!isAuthorizateToDelrte || isAuthorizateToDelrte.role === "COMMOM") {
      throw new InvalidCredentialsError()
    }
    const user = await this.usersRepository.update(objTransfer)

    return user
  }
}