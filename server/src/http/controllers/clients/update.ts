import { makeUpdateClientsUseCase } from "@/use-cases/factories/make-update-clients-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function update(request: FastifyRequest,reply:FastifyReply ) {
  const updateBodySchema = z.object({
    email: z.string().email(),
    phone: z.string().min(5),
    id : z.string().uuid(),
    userActionId:z.string().uuid()
  })

  const { id,email,phone,userActionId } = updateBodySchema.parse(request.body)

  try {
    const registerClient = await makeUpdateClientsUseCase()
    await registerClient.execute({
      email,
      phone,
      id,
      userActionId
    })
  }
  catch (err) {
    return reply.status(409).send(err)
  }

  return reply.status(200).send()
}