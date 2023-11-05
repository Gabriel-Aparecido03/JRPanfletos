import { makeUserAuhtenticationUseCase } from "@/use-cases/factories/make-user-authenticate-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


/**
 * Represents authenticate HTTP function
 * @param { FastifyRequest } request
 * @param { FastifyReply } reply
 */

export async function authenticate(request: FastifyRequest,reply : FastifyReply) {

  /** Creating the schema of validation  */
  const authenticateBodySchema = z.object({
    email : z.string(),
    password : z.string()
  })

  /** Making validation , with email and password  */
  const { email,password } = authenticateBodySchema.parse(request.body)

  /** Try catch block, where we make using the USE CASE for login  */
  try {
    const authenticateUseCase = await makeUserAuhtenticationUseCase()
    const user = await authenticateUseCase.execute({email,passoword : password})

    /** If the login is correctly is creating JWT token to user  */
    const token = await reply.jwtSign({},{
      sign : {
        sub : user.id,
        expiresIn : '7d'
      }
    })

    /** Sending the JWT token to user , for reply by fastify  */
    return reply.status(200).send({ token })
  } catch (err) {
    console.log(err)
    return reply.status(400).send()
  }
}