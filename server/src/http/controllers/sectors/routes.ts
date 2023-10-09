import { FastifyInstance } from "fastify";
import { deleteSector } from "./delete";
import { register } from "./register";
import { getAllSectors } from "./getAll";
import { update } from "./update";
import { getById } from "./getById";
import { verifyJwt } from "@/http/middlewares/verify-jwt";

export async function sectorRoutes(app: FastifyInstance) {
  app.addHook('onRequest',verifyJwt)
  
  app.post('/sector',register)
  app.get('/all-sectors',getAllSectors)
  app.put('/sector',update)
  app.delete('/sector/:id',deleteSector)
  app.get('/sector/:id',getById)
}
