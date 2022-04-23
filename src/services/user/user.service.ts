import { Injectable }   from "@nestjs/common";
import { InjectModel }  from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User }         from "../../models/user";

@Injectable()
export class UserService {
  
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}
  
  async getUserById(id: string) {
    return this.userModel.findOne({
      _id      : new Types.ObjectId(id),
      deletedAt: null
    });
  }
}
