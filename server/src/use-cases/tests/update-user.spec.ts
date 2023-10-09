import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InvalidCredentialsError } from "@/use-cases/erros/invalid-credentials-error";
import { RegisterUserUseCase } from "../users/register-user";
import { UserAlreadyExistsError } from "@/use-cases/erros/user-already-exists-error";
import { UpdateUserUseCase } from "../users/update-user";

let usersRepository: InMemoryUsersRepository
let sut : UpdateUserUseCase

describe('Update user use case',()=>{

  beforeEach(()=>{
    usersRepository = new InMemoryUsersRepository()
    sut = new UpdateUserUseCase(usersRepository)
  })

  it(" should be update user ",async ()=> {
    usersRepository.items.push({
      cpf_number : "cpf-test",
      created_at : new Date(),
      email : "email-test",
      id : "id-test-admin",
      name : "name-test",
      office : "office-test",
      password_hash : "passoword-hash-test",
      role : "ADMIN",
      updated_at : null,
      work_card_number : "work-card-number-test"
    })

    const { office } = await sut.execute({
      email : "email-test-02",
      office : "office-test-new-02",
      role : "COMMOM",
      id : "id-test-admin",
      password : "new-password-hash",
      user_action_id : "id-test-admin"
    })

    expect(office).toEqual("office-test-new-02")
  })

  it("not should be update user with non exists id.",async ()=> {
    usersRepository.items.push({
      cpf_number : "cpf-test",
      created_at : new Date(),
      email : "email-test",
      id : "id-test",
      name : "name-test",
      office : "office-test",
      password_hash : "passoword-hash-test",
      role : "ADMIN",
      updated_at : null,
      work_card_number : "work-card-number-test"
    })

    expect(async () => {
      await sut.execute({
        email : "email-test-02",
        office : "office-test-new-02",
        role : "COMMOM",
        id : "id-test-01",
        password : "new-password-hash",
        user_action_id : "id-test"
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it("not should be update user with repeated email.",async ()=> {
    usersRepository.items.push({
      cpf_number : "cpf-test",
      created_at : new Date(),
      email : "email-test",
      id : "id-test",
      name : "name-test",
      office : "office-test",
      password_hash : "passoword-hash-test",
      role : "COMMOM",
      updated_at : null,
      work_card_number : "work-card-number-test"
    })

    usersRepository.items.push({
      cpf_number : "cpf-test-01",
      created_at : new Date(),
      email : "email-test-01",
      id : "id-test-01",
      name : "name-test-01",
      office : "office-test-01",
      password_hash : "passoword-hash-test-01",
      role : "COMMOM",
      updated_at : null,
      work_card_number : "work-card-number-test-01"
    })

    expect(async () => {
      await sut.execute({
        email : "email-test",
        office : "office-test-new-02",
        role : "COMMOM",
        id : "id-test-01",
        password : "new-password-hash",
        user_action_id : "id-test"
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})