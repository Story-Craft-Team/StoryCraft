import { Request as HttpRequest } from 'express';


interface UserJwtPayload {
  id: string,
}
export type AuthRequest = HttpRequest & { user: UserJwtPayload }