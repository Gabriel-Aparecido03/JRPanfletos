import { MakeRegisterSectorsUseCase } from "@/use-cases/factories/make-register-sectors-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request:FastifyRequest,reply:FastifyReply ) {

  const bodyRegisterSchema = z.object({
    name : z.string().min(2)
  })

  const data = bodyRegisterSchema.parse(request.body)

  try {
    const register = await MakeRegisterSectorsUseCase()
    await register.execute(data.name)
    return reply.status(202).send()
  } catch (error) {
    return reply.status(409).send(error)
  }
}