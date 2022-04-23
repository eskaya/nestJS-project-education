import { Injectable }  from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model }       from "mongoose";
import { List }        from "../../models/list";

@Injectable()
export class ListService {
  
  constructor(@InjectModel(List.name) private readonly listModel: Model<List>) {}
  
  async getAllItems() {
    
    return this.listModel
      .find({ deletedAt: null })
      .populate({
        path: 'user',
        select: {fullName:1, _id: 0}
      })
    
  }
  
  async deleteItem(_id) {
    return this.listModel.deleteOne({ _id });
  }
  
  async createItem(newItem, userId) {
    newItem.user = userId
    console.log(userId)
    const newListItem = await new this.listModel(newItem).save()
    return newListItem;
  }
}
