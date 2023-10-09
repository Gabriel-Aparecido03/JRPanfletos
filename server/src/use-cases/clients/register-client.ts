import { ClientsRepository } from "@/repositories/clients-repository";
import { isValidCnpjNumber } from "@/utils/validatre-cnpj-number";
import { ClientAlreadyExistsError } from "../erros/client-already-exists-error";
import { InvalidCredentialsError } from "../erros/invalid-credentials-error";
import { UsersRepository } from "@/repositories/users-repository";

interface RegisterUseCaseRequest {
  socialName: string;
  email: string;
  phone: string;
  cnpj: string;
  userCreatedId: string;
}

export class RegisterClientUseCase {
  constructor (
    private clientsRepository : ClientsRepository ,
    private usersRepository : UsersRepository
    ) {}
  async execute(data :RegisterUseCaseRequest) { 

    const isInvalidCnpj = isValidCnpjNumber(data.cnpj)
    if(!isInvalidCnpj) {
      throw new InvalidCredentialsError()
    }

    const isRepeatedCnpj = await this.clientsRepository.findByCnpj(data.cnpj)
    if(isRepeatedCnpj) {
      throw new ClientAlreadyExistsError()
    }

    const isRepeatedEmail = await this.clientsRepository.findByEmail(data.email)
    if(isRepeatedEmail) {
      throw new ClientAlreadyExistsError()
    }

    const userExist = await this.usersRepository.findById(data.userCreatedId)
    if(!userExist) {
      throw new InvalidCredentialsError()
    }

    const client = await this.clientsRepository.register({
      cnpj : data.cnpj,
      email : data.email,
      phone : data.phone,
      socialName : data.socialName,
      user_created_id : data.userCreatedId
    })
    return client
  } 
}