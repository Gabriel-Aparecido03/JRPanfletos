import { Prisma, User } from "@prisma/client";

interface UpdateUserRequest {
  role: "ADMIN" | "COMMOM";
  office: string;
  email: string;
  password_hash: string;
  id:string;
}

export interface UsersRepository {
  register(data : Prisma.UserCreateInput) : Promise<User>
  delete(id:string) : Promise<void>
  update(data : UpdateUserRequest) : Promise<User>

  findById(id:string) : Promise<User | null>
  findByCpf(cpf:string): Promise<User | null>
  findByEmail(cpf:string): Promise<User | null>
  findByWorkerCardNumber(workerCardNumber:string): Promise<User | null>
  
  getAllUsersList() : Promise<User[]>
}