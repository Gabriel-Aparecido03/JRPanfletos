import { makeRegisterClientsUseCase } from "@/use-cases/factories/make-register-clients-use-case";
import { isValidCnpjNumber } from "@/utils/validatre-cnpj-number";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest,reply:FastifyReply ) {
  const registerBodySchema = z.object({
    socialName: z.string().min(3),
    email: z.string().email(),
    phone: z.string().min(5),
    cnpj: z.string().refine( value => isValidCnpjNumber(value)),
    userCreatedId: z.string().uuid()
  })

  const { cnpj,email,phone,socialName,userCreatedId } = registerBodySchema.parse(request.body)

  try {
    const registerClient = await makeRegisterClientsUseCase()
    await registerClient.execute({
      cnpj,
      email,
      phone,
      socialName,
      userCreatedId
    })
  }
  catch (err) {
    return reply.status(409).send(err)
  }

  return reply.status(200).send()
}