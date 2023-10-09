import { MakeRegisterReportDistributionUseCase } from "@/use-cases/factories/make-register-reports-distributions-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request:FastifyRequest,reply:FastifyReply ) {

  const bodyRegisterSchema = z.object({
    first_photo_url: z.string(),
    second_photo_url: z.string(),
    third_photo_url: z.string(),
    authorization_id : z.string().uuid(),
    user_created_id : z.string().uuid()
  })

  const data = bodyRegisterSchema.parse(request.body)

  try {
    const register = await MakeRegisterReportDistributionUseCase()
    await register.execute(data)
    return reply.status(202).send()
  } catch (error) {
    return reply.status(409).send(error)
  }
}