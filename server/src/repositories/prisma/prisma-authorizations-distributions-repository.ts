import { prisma } from "@/lib/prisma";
import { AuthorizationsDistributionsRepository } from "../authotizations-distributions-repository";

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

export class PrismaAuthorizationsDistributionsRepository implements AuthorizationsDistributionsRepository {

  async register(data: CreateAuthorizationsDistributionsType) {
    
    const authotization = await prisma.authorizationOfDistribution.create({
      data : {
        value_of_thousand_in_cents : data.value_of_thousand_in_cents,
        client_id : data.client_created_id,
        creation_user_id : data.user_created_id
      }
    }) 

    const sectors = []
    
    for(const sector of data.sectorsOfDistributions) {
      await prisma.authorizationsHasSectors.create({
        data : {
          authorization_of_distribution_id : authotization.id,
          sector_id : sector
        }
      })

      sectors.push(sector)
    }

    return {
      id : authotization.id,
      creation_user_id: authotization.creation_user_id,
      client_id: authotization.client_id,
      created_at: authotization.created_at,
      value_of_thousand_in_cents: authotization.value_of_thousand_in_cents,
      sectorsOfDistributions : sectors
    }
  }

  async delete(id: string) {
    await prisma.authorizationsHasSectors.deleteMany({
      where : {
        authorization_of_distribution_id : id
      }
    })

    await prisma.authorizationOfDistribution.delete({
      where : {
        id
      }
    })
  }

  async getAll() {
    const items = await prisma.authorizationOfDistribution.findMany()
    const collections = []

    for( const item of items ) {
      const sectors = await prisma.authorizationsHasSectors.findMany({
        where : {
          authorization_of_distribution_id : item.id
        },
        select : {
          sector_id : true,
        }
      })
      const sectorsFilteres = sectors.map(item => item.sector_id)
      let collectionsOfSectors : SectorOutput[]  = []
      sectorsFilteres.map(async(sector) => {
        const sectorSelected = await prisma.sector.findUniqueOrThrow({
          where : {
            id : sector
          }
        })

        collectionsOfSectors.push({ id : sector , name : sectorSelected.name })
      })

      const user = await prisma.user.findUniqueOrThrow({ 
        where : {
          id : item.creation_user_id
        }
      })

      const client = await prisma.client.findUniqueOrThrow({
        where : {
          id : item.client_id
        }
      })

      const report = await prisma.reportsDistributions.findUnique({
        where : {
          authorization_id : item.id
        }
      })

      collections.push(
        {...item,
          sectorsOfDistributions : collectionsOfSectors , 
          userCreatedName : user!.name , 
          clientName : client.socialName,
          report_id : report ? report.id : null
        }
      )
    } 

    return collections
  }

  async getById(id: string) {

    const item = await prisma.authorizationOfDistribution.findUnique({
      where : {
        id
      }
    })

    const sectors = await prisma.authorizationsHasSectors.findMany({
      where : {
        authorization_of_distribution_id : item!.id
      },
      select : {
        sector_id : true
      }
    })
    const sectorsFilteres = sectors.map(item => item.sector_id)
    const newItem = Object.assign(item!,{ sectorsOfDistributions : sectorsFilteres})

    return newItem
  }
  
}