import { InMemoryAuthorizationsDistributionsRepository } from "@/repositories/in-memory/in-memory-authorizations-distributions-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { DeleteAuthorizationsDistribtuionsUseCase } from "../authorizations-distributions/delete-authorization-distribution";
import { ResourceNotFound } from "../erros/resource-not-found-error";
import { GetAllAuthorizationsDistribtuionsUseCase } from "../authorizations-distributions/get-all-authorizations-distributions";

let authorizationDistributionsRepository : InMemoryAuthorizationsDistributionsRepository
let sut : GetAllAuthorizationsDistribtuionsUseCase

describe('Get All authorizations distributions',()=>{

  beforeEach(()=>{
    authorizationDistributionsRepository = new InMemoryAuthorizationsDistributionsRepository()
    sut = new GetAllAuthorizationsDistribtuionsUseCase(authorizationDistributionsRepository)
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

    const response = await sut.execute()

    expect(response).toHaveLength(1)
    expect(response).toEqual([
      expect.objectContaining({ id : "id"})
    ])
  })
})