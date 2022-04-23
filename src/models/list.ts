import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "./user";

enum Status {
  URGENT = 'urgent',
  TODAY = 'today',
  TOMORROW = 'tomorrow',
  NOT_TODAY = 'not-today'
}
// veri tabanı için oluşturulan modeller ve validationlar
@Schema()
export class List extends Document{
  @Prop({ type: String })
  itemName: string;
  
  @Prop({
    type: Number,
    default: 1,
    required: true
  })
  quantity: number;
  
  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    set: (v) => new Types.ObjectId(v)
  })
  user: User['_id'];
  
  @Prop({ type: String, enum: Status })
  status: Status;
  
  @Prop({
    type   : Date,
    default: Date.now,
  })
  createdAt: Date;
  
  @Prop({ type: Date })
  updatedAt: Date;
  
  @Prop({ type: Date })
  deletedAt: Date;
}

export const ListSchema = SchemaFactory.createForClass(List);
