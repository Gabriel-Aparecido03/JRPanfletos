import { InMemoryAuthorizationsDistributionsRepository } from "@/repositories/in-memory/in-memory-authorizations-distributions-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFound } from "../erros/resource-not-found-error";
import { GetByIdAuthorizationsDistribtuionsUseCase } from "../authorizations-distributions/get-authorization-distribution-by-id";

let authorizationDistributionsRepository : InMemoryAuthorizationsDistributionsRepository
let sut : GetByIdAuthorizationsDistribtuionsUseCase

describe('Get by id authorizations distributions',()=>{

  beforeEach(()=>{
    authorizationDistributionsRepository = new InMemoryAuthorizationsDistributionsRepository()
    sut = new GetByIdAuthorizationsDistribtuionsUseCase(authorizationDistributionsRepository)
  })

  it("should be get the an authorizations distributions by id",async() => {
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

    expect(response.id).toEqual("id")
  })

  it("not should be get the an authorizations distributions with non exists id ",async() => {
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