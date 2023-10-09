import { InMemoryClientsRepository } from "@/repositories/in-memory/in-memory-clients-repoistory";
import { beforeEach, describe, expect, it } from "vitest";
import { DeleteClientUseCase } from "../clients/delete-client";
import { InvalidCredentialsError } from "../erros/invalid-credentials-error";
import { GetClientById } from "../clients/get-client-by-id";
import { ResourceNotFound } from "../erros/resource-not-found-error";

let clientsRepository : InMemoryClientsRepository
let sut : GetClientById

describe('Get by id client use case',()=>{

  beforeEach(()=>{
    clientsRepository = new InMemoryClientsRepository()
    sut = new GetClientById(clientsRepository)
  })

  it("should be to get a client by id",async()=>{
    clientsRepository.items.push({
      cnpj : "cnpj-01",
      created_at : new Date(),
      email : "email-01",
      id : "id-01",
      phone : "phone-01",
      socialName : "social-name-01",
      updated_at : null,
      user_created_id : "user-created-id-01"
    })
    const { cnpj } = await sut.execute("id-01")
    expect(cnpj).toEqual("cnpj-01")
  })

  it("not should be to get a client with non exists id",async()=>{
    clientsRepository.items.push({
      cnpj : "cnpj-01",
      created_at : new Date(),
      email : "email-01",
      id : "id-01",
      phone : "phone-01",
      socialName : "social-name-01",
      updated_at : null,
      user_created_id : "user-created-id-01"
    })

    expect(async()=>{
      await sut.execute("id-02")
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })
})