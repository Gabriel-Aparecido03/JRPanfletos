import { MakeDeleteSectorsUseCase } from "@/use-cases/factories/make-delete-sectors-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function deleteSector(request: FastifyRequest,reply:FastifyReply ) {
  const deleteBodySchema = z.object({
    id : z.string().uuid()
  })
  const { id } = deleteBodySchema.parse(request.params)

  try {
    const deleteSector = await MakeDeleteSectorsUseCase()
    await deleteSector.execute( id )
  }
  
  catch (err) {
    return reply.status(409).send(err)
  }

  return reply.status(200).send()
}