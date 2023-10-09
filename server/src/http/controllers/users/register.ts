import { makeRegisterUsersUseCase } from "@/use-cases/factories/make-register-users-use-case";
import { isValidCpfNumber } from "@/utils/validate-cpf-number";
import { validatePassowordPolicy } from "@/utils/validate-password-policy";
import console from "console";
import { FastifyReply, FastifyRequest } from "fastify";
import { isValid, z } from "zod";

export async function register(request: FastifyRequest,reply:FastifyReply ) {

  const resgisterBodySchema = z.object({
    name: z.string().min(3),
    role: z.enum(["ADMIN" , "COMMOM"]).default("COMMOM"),
    cpfNumber: z.string(),
    workCardNumber: z.string(),
    office: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    createdUserId: z.string().uuid(),
  })
  console.log(request.body)
  const data = resgisterBodySchema.parse(request.body)

  try {
    const register = await makeRegisterUsersUseCase()
    await register.execute(data)
  }
  catch (err) {
    return reply.status(409).send(err)
  }

  return reply.status(201).send()
}