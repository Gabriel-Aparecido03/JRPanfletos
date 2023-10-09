import { beforeEach, describe, expect, it } from "vitest";
import { DeleteUserUseCase } from "../users/delete-user";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InvalidCredentialsError } from "@/use-cases/erros/invalid-credentials-error";
import { GetAllUsersUseCase } from "../users/get-all-users";

let usersRepository: InMemoryUsersRepository
let sut : GetAllUsersUseCase

describe('Get All users use case',()=>{

  beforeEach(()=>{
    usersRepository = new InMemoryUsersRepository()
    sut = new GetAllUsersUseCase(usersRepository)
  })

  it('should be get all users',async ()=>{
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

    const response = await sut.execute()
    expect(response).toHaveLength(1)
    expect(response).toEqual([
      expect.objectContaining({ name : "name-test"})
    ])
  })
})