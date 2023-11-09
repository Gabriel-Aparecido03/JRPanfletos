import { randomUUID } from "crypto";
import { AuthorizationsDistributionsRepository } from "../authotizations-distributions-repository";

interface CreateAuthorizationsDistributionsType {
  value_of_thousand_in_cents: number;
  user_created_id : string;
  client_created_id:string;
  sectorsOfDistributions : string[]
}

interface AuthorizationsDistributions {
  id : string;
  created_at : Date ;
  value_of_thousand_in_cents: number;
  creation_user_id : string;
  client_id:string;
  sectorsOfDistributions : string[]
}

interface SectorOutput {
  id : string ;
  name : string
}

interface AuthorizationsOutput {
  id: string;
  creation_user_id: string;
  client_id: string;
  created_at: Date;
  value_of_thousand_in_cents: number;
  sectorsOfDistributions : SectorOutput[]
}

export class InMemoryAuthorizationsDistributionsRepository implements AuthorizationsDistributionsRepository {

  public items : AuthorizationsDistributions[] = []

  async register(data: CreateAuthorizationsDistributionsType){
    const authorizationOfDistribution : AuthorizationsDistributions = {
      client_id : data.client_created_id,
      created_at : new Date(),
      creation_user_id : data.user_created_id,
      id : randomUUID(),
      value_of_thousand_in_cents : data.value_of_thousand_in_cents,
      sectorsOfDistributions : data.sectorsOfDistributions,
    }

    this.items.push(authorizationOfDistribution)

    return authorizationOfDistribution
  }
  async delete(id: string){
    const authorizatonsIndex = this.items.findIndex(item => item.id === id)
    this.items.splice(authorizatonsIndex,1)
  }

  async getAll(){
    return this.items
  }

  async getById(id: string){
    const authorizationItemSelected = this.items.find( item => item.id === id)
    if(!authorizationItemSelected) { return null }
    return authorizationItemSelected
  }
  
}