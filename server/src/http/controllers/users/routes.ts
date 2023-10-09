import { FastifyInstance } from "fastify";
import { getAllUsers } from "./getAll";
import { update } from "./update";
import { deleteUser } from "./delete";
import { register } from "./register";
import { getById } from "./getById";
import { authenticate } from "./authenticate";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { me } from "./me";
import { validate } from "./validate";
 
export async function usersRoutes(app: FastifyInstance) {

  app.post('/user',{ onRequest: [verifyJwt] },register)
  app.get('/all-users',{ onRequest: [verifyJwt] },getAllUsers)
  app.put('/user',{ onRequest: [verifyJwt] },update)
  app.delete('/user/:id/:userActionId',{ onRequest: [verifyJwt] },deleteUser)
  app.get('/user/:id',{ onRequest: [verifyJwt] },getById)
  app.get('/session/me',{ onRequest: [verifyJwt] },me)

  app.post('/session/',authenticate)
  app.get('/session/validate',validate)
}
