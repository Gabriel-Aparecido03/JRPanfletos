import { FastifyInstance } from "fastify"
import { deleteClient } from "./delete"
import { getAllClients } from "./getAll"
import { register } from "./register"
import { update } from "./update"
import { getById } from "./getById"
import { verifyJwt } from "@/http/middlewares/verify-jwt"

export async function clientsRoutes(app: FastifyInstance) {
  app.addHook('onRequest',verifyJwt)

  app.post('/clients',register)
  app.get('/all-clients',getAllClients)
  app.put('/clients',update)
  app.delete('/clients/:id',deleteClient)
  app.get('/clients/:id',getById)
}
