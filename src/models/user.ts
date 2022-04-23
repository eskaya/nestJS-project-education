import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

// Scheama -> Veritabanındaki tablolar.
// Document -> Bir mongoose belgesi.
@Schema()
export class User extends Document {
  
  @Prop({
    type: String,
    required: true
  })
  email: string;
  
  @Prop({ type: String })
  password: string;
  
  @Prop({
    type: String,
    required: true,
    minlength: 1
  })
  fullName: string;
  
  @Prop({
    type: Date,
    default: Date.now
  })
  createdAt: Date;
  
  @Prop({ type: Date })
  updatedAt: Date;
  
  @Prop({ type: Date })
  deletedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
