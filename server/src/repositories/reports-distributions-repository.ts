import { Prisma, ReportsDistributions } from "@prisma/client";

interface CreateReportDistributionType {
  first_photo_url: string;
  second_photo_url: string;
  third_photo_url: string;
  authorization_id : string;
  user_created_id : string;
}

export interface ReportsDistributionsRepository {
  register(data :CreateReportDistributionType) : Promise <ReportsDistributions>
  delete( id :string) : Promise<void>
  getAll():Promise <ReportsDistributions[]>
  getById(id:string): Promise < ReportsDistributions | null >
  getByAuthorizationId(authorizationId:string): Promise < ReportsDistributions | null >
}