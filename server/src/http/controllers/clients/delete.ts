import { makeDeleteClientsUseCase } from "@/use-cases/factories/make-delete-clients-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function deleteClient(request: FastifyRequest,reply:FastifyReply ) {
  const deleteBodySchema = z.object({
    id : z.string().uuid(),
    userActionId: z.string().uuid()
  })

  const { id,userActionId } = deleteBodySchema.parse(request.params)

  try {
    const deleteClient = await makeDeleteClientsUseCase()
    await deleteClient.execute({ id , userActionId } )
  }
  catch (err) {
    return reply.status(409).send(err)
  }

  return reply.status(200).send()
}