import { makeUserAuhtenticationUseCase } from "@/use-cases/factories/make-user-authenticate-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


/**
 * Represents the authentication HTTP function.
 * @param {FastifyRequest} request - The Fastify request object.
 * @param {FastifyReply} reply - The Fastify reply object.
 * @return {FastifyReply} Returns the Fastify reply.
 */

export async function authenticate(request: FastifyRequest,reply : FastifyReply) {

  // Creating the schema for request body validation
  const authenticateBodySchema = z.object({
    email : z.string(),
    password : z.string()
  })

  // Validating the request body using the schema
  const { email,password } = authenticateBodySchema.parse(request.body)

  // Using the Use Case for authentication
  try {
    const authenticateUseCase = await makeUserAuhtenticationUseCase()
    const user = await authenticateUseCase.execute({email,passoword : password})

    // Creating a JWT token for the authenticated user
    const token = await reply.jwtSign({},{
      sign : {
        sub : user.id,
        expiresIn : '7d'
      }
    })

    // Sending the JWT token to the user as part of the response
    return reply.status(200).send({ token })
  } catch (err) {
    console.log(err)
    // Handling authentication error and sending an appropriate response
    return reply.status(400).send()
  }
}