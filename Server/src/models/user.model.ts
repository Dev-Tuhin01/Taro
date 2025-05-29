import mongoose, { Document, Schema } from "mongoose";

export interface UserDocument extends mongoose.Document {
  userName: string;
  password: string;
  role: "parent" | "child";
  parentId ?: mongoose.Types.ObjectId;
  taroDollar: number;
  food: number;
}

const userSchema = new Schema<UserDocument>({
  userName: {
    type:String,
    required:true,
    unique:true
  },
  password: {
    type:String,
    required:true
  },
  role:{
    type:String,
    enum: ["parent", "child"],
    required: true,
  },
  parentId: {
    type:mongoose.Types.ObjectId,
    ref:"user"
  },
  taroDollar: {
    type:Number,
    default:0
  },
  food :{
    type: Number,
    default: 0
  }
});

const User = mongoose.model<UserDocument>('user', userSchema);

export default User;