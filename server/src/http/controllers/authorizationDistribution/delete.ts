import { makeDeleteAuthorizationsDistributionsUseCase } from "@/use-cases/factories/make-delete-authorizations-distributions-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteDistributionAuthorizaton(request: FastifyRequest,reply:FastifyReply ) {
  const resgisterBodySchema = z.object({
    id : z.string().uuid(),
  })

  const data = resgisterBodySchema.parse(request.body)

  try {
    const register = await makeDeleteAuthorizationsDistributionsUseCase()
    await register.execute(data.id)
  }
  catch (err) {
    return reply.status(409).send(err)
  }

  return reply.status(201).send()
}