import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InvalidCredentialsError } from "@/use-cases/erros/invalid-credentials-error";
import { RegisterUserUseCase } from "../users/register-user";
import { UserAlreadyExistsError } from "@/use-cases/erros/user-already-exists-error";

let usersRepository: InMemoryUsersRepository
let sut : RegisterUserUseCase

describe('Register user use case',()=>{

  beforeEach(()=>{
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUserUseCase(usersRepository)
  })

  it('should be register an user',async ()=>{

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

    const { user } = await sut.execute({
      cpfNumber : "76752373230",
      email : "email-test-02",
      name : "name-test-02",
      office : "office-test-02",
      password : "passoword-hash-test-02",
      role : "COMMOM",
      workCardNumber : "work-card-number-test-02",
      createdUserId : "id-test"
    })

    expect(user.id).toEqual(expect.any(String))
  })

  
  it('not should be register an user with invalid cpf',async ()=>{
    expect(async ()=> {
      await sut.execute({
        cpfNumber : "cpf-test-02",
        email : "email-test-02",
        name : "name-test-02",
        office : "office-test-02",
        password : "passoword-hash-test-02",
        role : "COMMOM",
        workCardNumber : "work-card-number-test-02",
        createdUserId: "id-test"
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it("not should be create user with commom role creation user.",async ()=> {
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

    expect(async () => {
      await sut.execute({
        cpfNumber : "76752373230",
        email : "email-test-02",
        name : "name-test-02",
        office : "office-test-02",
        password : "passoword-hash-test-02",
        role : "COMMOM",
        workCardNumber : "work-card-number-test-02",
        createdUserId: "id-test"
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it("not should be create user with repeated cpf.",async ()=> {
    usersRepository.items.push({
      cpf_number : "76752373230",
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
        cpfNumber : "76752373230",
        email : "email-test-02",
        name : "name-test-02",
        office : "office-test-02",
        password : "passoword-hash-test-02",
        role : "COMMOM",
        workCardNumber : "work-card-number-test-02",
        createdUserId : "id-test"
      })
    }).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it("not should be create user with repeated email.",async ()=> {
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
        cpfNumber : "76752373230",
        email : "email-test",
        name : "name-test-02",
        office : "office-test-02",
        password : "passoword-hash-test-02",
        role : "COMMOM",
        workCardNumber : "work-card-number-test-02",
        createdUserId : "id-test"
      })
    }).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it("not should be create user with repeated work card number.",async ()=> {
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
        cpfNumber : "76752373230",
        email : "email-test-02",
        name : "name-test-02",
        office : "office-test-02",
        password : "passoword-hash-test-02",
        role : "COMMOM",
        workCardNumber : "work-card-number-test",
        createdUserId: "id-test"
      })
    }).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})