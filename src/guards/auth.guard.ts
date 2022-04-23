import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { Types }                                                                from "mongoose";
import * as jwt                                                                 from "jsonwebtoken";
import { JWT_SECRET }                                                           from "../consts";
import { UserService }                                                          from "../services/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService) {}
  
  async canActivate(
    context: ExecutionContext
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if(!request.headers["authorization"]) {
      throw new HttpException("JWT not found!", HttpStatus.BAD_REQUEST);
    }
    // Şifreli tokenı çözerek kullanıcının id sini buluyoruz.
    const { _id } = jwt.verify(request.headers["authorization"], JWT_SECRET);
    const foundUser = await this.userService.getUserById(_id);
    if(!foundUser) {
      throw new HttpException("User not found!", HttpStatus.BAD_REQUEST);
    }
    // bulduğumuz id yi diğer isteklerde kullanmak için requestin içine findUser olarak ekliyoruz.
    request.userId = new Types.ObjectId(_id);
    return true;
    
  }
  
}
