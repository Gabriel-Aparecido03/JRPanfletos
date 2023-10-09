import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { GetUserByIdUseCase } from "../users/get-user-by-id";

let usersRepository: InMemoryUsersRepository
let sut : GetUserByIdUseCase

describe('Get By id uses use case',()=>{

  beforeEach(()=>{
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserByIdUseCase(usersRepository)
  })

  it('should be get user by id',async ()=>{
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

    const { id } = await sut.execute("id-test")
    expect(id).toEqual("id-test")
  })
})