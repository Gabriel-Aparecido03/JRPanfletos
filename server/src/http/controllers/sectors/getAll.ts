import { MakeGetAllSectorsUseCase } from "@/use-cases/factories/make-get-all-sectors-use-case";
import { FastifyReply } from "fastify";

export async function getAllSectors(_:any,reply:FastifyReply ) {

  const getAll = await MakeGetAllSectorsUseCase()
  const response = await getAll.execute()

  return reply.status(200).send({ sectors : response })
}