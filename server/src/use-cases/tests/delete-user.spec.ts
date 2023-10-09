import { beforeEach, describe, expect, it } from "vitest";
import { DeleteUserUseCase } from "../users/delete-user";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InvalidCredentialsError } from "@/use-cases/erros/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository
let sut : DeleteUserUseCase

describe('Delete user use case',()=>{

  beforeEach(()=>{
    usersRepository = new InMemoryUsersRepository()
    sut = new DeleteUserUseCase(usersRepository)
  })

  it('should be delete an user',async ()=>{
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

    const response = await sut.execute({id : "id-test",user_action_id : "id-test"})
    expect(response).toBeUndefined()
  })

  it("not should be delete user with wrong or not exists id",async ()=> {
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


    expect(async ()=> {
     await sut.execute("id-test-not-exist")
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})