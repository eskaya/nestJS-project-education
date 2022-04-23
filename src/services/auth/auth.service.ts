import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel }                           from "@nestjs/mongoose";
import { Model }                                 from "mongoose";
import { AuthWithCredentialsDTO }                from "../../dtos/auth-with-credentials.dto";
import { User }                                  from "../../models/user";
import * as bcrypt                               from "bcrypt";
import * as jwt                                  from "jsonwebtoken";
import { JWT_SECRET }                            from "../../consts";

@Injectable()
export class AuthService {
  
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}
  
  async authWithCredentials(args: AuthWithCredentialsDTO): Promise<any> {
    
    const user: User = await this.userModel.findOne({
      email    : args.email,
      deletedAt: null
    });
    
    if(!user) {
      throw new HttpException("User not found!", HttpStatus.NOT_FOUND);
    }
    
    const isMatch = await bcrypt.compare(args.password, user.password);
    if(!isMatch) {
      throw new HttpException("Invalid password!", HttpStatus.FORBIDDEN);
    }
    
    const accessToken = await jwt.sign({ _id: user._id.toString() }, JWT_SECRET);
    
    return {
      email    : user.email,
      fullName : user.fullName,
      createdAt: user.createdAt,
      accessToken
    }
  }
  
  async sendPassViaEmail() {
    return {
      sendAt: new Date().toISOString()
    }
  }
}
