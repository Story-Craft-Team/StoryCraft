import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";

@Injectable()
export class UserHelperService {
  excludePassword(user: User): Omit<User, 'password'> {
    const { password, ...rest } = user as any;
    return rest;
  }
}
