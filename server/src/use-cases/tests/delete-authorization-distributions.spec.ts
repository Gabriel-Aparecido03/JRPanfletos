import { InMemoryAuthorizationsDistributionsRepository } from "@/repositories/in-memory/in-memory-authorizations-distributions-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { DeleteAuthorizationsDistribtuionsUseCase } from "../authorizations-distributions/delete-authorization-distribution";
import { ResourceNotFound } from "../erros/resource-not-found-error";

let authorizationDistributionsRepository : InMemoryAuthorizationsDistributionsRepository
let sut : DeleteAuthorizationsDistribtuionsUseCase

describe('Delete authorizations distributions',()=>{

  beforeEach(()=>{
    authorizationDistributionsRepository = new InMemoryAuthorizationsDistributionsRepository()
    sut = new DeleteAuthorizationsDistribtuionsUseCase(authorizationDistributionsRepository)
  })

  it("should be delete an authorizations distributions",async() => {
    authorizationDistributionsRepository.items.push({
      client_id : "client-id",
      created_at : new Date(),
      creation_user_id : "user-id",
      id : "id",
      sectorsOfDistributions : [
        "01","02"
      ],
      value_of_thousand_in_cents : 100
    })

    const response = await sut.execute("id")
    expect(response).toBeUndefined()
  })

  it("not should be delete an authorizations distributions with non id",async() => {
    authorizationDistributionsRepository.items.push({
      client_id : "client-id",
      created_at : new Date(),
      creation_user_id : "user-id",
      id : "id",
      sectorsOfDistributions : [
        "01","02"
      ],
      value_of_thousand_in_cents : 100
    })

    expect(async ()=>{
      await sut.execute("id-error")
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })
})