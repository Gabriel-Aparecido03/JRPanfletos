import { MakeGetAllSectorsUseCase } from "@/use-cases/factories/make-get-all-sectors-use-case";
import { MakeRegisterSectorsUseCase } from "@/use-cases/factories/make-register-sectors-use-case";
import { MakeUpdateSectorsUseCase } from "@/use-cases/factories/make-update-sectors-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function update(request:FastifyRequest,reply:FastifyReply ) {

  const bodyRegisterSchema = z.object({
    name : z.string().min(2),
    id : z.string().uuid()
  })

  const data = bodyRegisterSchema.parse(request.body)

  try {
    const register = await MakeUpdateSectorsUseCase()
    await register.execute(data)
    return reply.status(202).send()
  } catch (error) {
    return reply.status(409).send(error)
  }
}