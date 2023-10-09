import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "../erros/invalid-credentials-error";
import { UserAlreadyExistsError } from "../erros/user-already-exists-error";
import { isValidCpfNumber } from "@/utils/validate-cpf-number";

interface RegisterUseCaseRequest {
  name: string;
  role: "ADMIN" | "COMMOM";
  cpfNumber: string;
  workCardNumber: string;
  office: string;
  email: string;
  password: string;
  createdUserId: string;
}

export class RegisterUserUseCase {
  constructor(private usersRepository:UsersRepository) {}

  async execute({ cpfNumber,email,name,office,password,workCardNumber,role,createdUserId }:RegisterUseCaseRequest) {
    
    const isPossibleToCreateAnUser = await this.usersRepository.findById(createdUserId)

    if(isPossibleToCreateAnUser?.role !== "ADMIN") {
      throw new InvalidCredentialsError() 
    }

    const isValidCpf = isValidCpfNumber(cpfNumber)
    if(!isValidCpf) {
      throw new InvalidCredentialsError()
    }

    const repeatedCpf = await this.usersRepository.findByCpf(cpfNumber)
    if(repeatedCpf) {
      throw new UserAlreadyExistsError()
    }

    const repeatedEmail = await this.usersRepository.findByEmail(email)
    if(repeatedEmail) {
      throw new UserAlreadyExistsError()
    }

    const repeatedWorkerCardNumber = await this.usersRepository.findByWorkerCardNumber(workCardNumber)
    if(repeatedWorkerCardNumber) {
      throw new UserAlreadyExistsError()
    }

    const passwordHash = await hash(password,6)

    const user = await this.usersRepository.register({
      cpf_number : cpfNumber,
      email,
      name,
      office,
      password_hash: passwordHash,
      work_card_number : workCardNumber
    })

    return { user }
  }
}