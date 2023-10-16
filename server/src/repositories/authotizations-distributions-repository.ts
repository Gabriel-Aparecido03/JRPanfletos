interface CreateAuthorizationsDistributionsType {
  value_of_thousand_in_cents: number;
  user_created_id : string;
  client_created_id:string;
  sectorsOfDistributions : string[]
}


interface SectorOutput {
  id : string ;
  name : string
}

interface AuthorizationsCallback {
  id: string;
  creation_user_id: string;
  client_id: string;
  created_at: Date;
  value_of_thousand_in_cents: number;
  sectorsOfDistributions : string[]
}

interface AuthorizationsOutput {
  id: string;
  creation_user_id: string;
  client_id: string;
  created_at: Date;
  value_of_thousand_in_cents: number;
  sectorsOfDistributions : SectorOutput[]
}

export interface AuthorizationsDistributionsRepository {
  register(data : CreateAuthorizationsDistributionsType) : Promise< AuthorizationsCallback >
  delete(id:string): Promise < void >
  getAll() : Promise< AuthorizationsOutput [] >
  getById(id:string): Promise < AuthorizationsCallback | null > 
}