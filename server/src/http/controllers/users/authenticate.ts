import { makeUserAuhtenticationUseCase } from "@/use-cases/factories/make-user-authenticate-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(request: FastifyRequest,reply : FastifyReply) {
  const authenticateBodySchema = z.object({
    email : z.string(),
    password : z.string()
  })
  const { email,password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = await makeUserAuhtenticationUseCase()
    const user = await authenticateUseCase.execute({email,passoword : password})
    const token = await reply.jwtSign({},{
      sign : {
        sub : user.id,
        expiresIn : '7d'
      }
    })
    return reply.status(200).send({ token })
  } catch (err) {
    console.log(err)
    return reply.status(400).send()
  }
}