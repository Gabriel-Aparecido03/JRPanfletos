import { InMemoryClientsRepository } from "@/repositories/in-memory/in-memory-clients-repoistory";
import { beforeEach, describe, expect, it } from "vitest";
import { DeleteClientUseCase } from "../clients/delete-client";
import { InvalidCredentialsError } from "../erros/invalid-credentials-error";
import { GetAllClientsUseCase } from "../clients/get-all-clients";

let clientsRepository : InMemoryClientsRepository
let sut : GetAllClientsUseCase

describe('Get all clients use case',()=>{

  beforeEach(()=>{
    clientsRepository = new InMemoryClientsRepository()
    sut = new GetAllClientsUseCase(clientsRepository)
  })

  it("should be to get all a clients",async()=>{
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
    const items = await sut.execute()
    expect(items).toHaveLength(1)
    expect(items).toEqual([
      expect.objectContaining({ socialName : "social-name-01"})
    ])
  })
})