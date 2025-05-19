import { Role } from "@prisma/client";

export interface JwtPayload {
  sub?: number;
  id?: number;
  username: string;
  role: Role;
}