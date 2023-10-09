import { makeRegisterAuthorizationsDistributionsUseCase } from "@/use-cases/factories/register-authorization-distributions-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest,reply:FastifyReply ) {
  const resgisterBodySchema = z.object({
    clientId : z.string().uuid(),
    creationUserId :z.string().uuid(),
    valueOfThousandInCents : z.number().min(0),
    sectorsOfDistributions : z.string().array()
  })

  const {clientId,creationUserId,sectorsOfDistributions,valueOfThousandInCents} = resgisterBodySchema.parse(request.body)

  try {
    const register = await makeRegisterAuthorizationsDistributionsUseCase()
    await register.execute({
      client_created_id : clientId,
      sectorsOfDistributions : sectorsOfDistributions,
      user_created_id : creationUserId,
      value_of_thousand_in_cents : valueOfThousandInCents
    })
  }
  catch (err) {
    return reply.status(409).send(err)
  }

  return reply.status(201).send()
}