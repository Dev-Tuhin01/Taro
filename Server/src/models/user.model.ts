import mongoose, { Document, Schema } from "mongoose";

export interface userDocument extends mongoose.Document {
  userName: string;
  password: string;
  role: "parent" | "child";
  parentId ?: mongoose.Types.ObjectId;
  taroDollar: number;
}

const userSchema = new Schema<userDocument>({
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
  }
});

const userModel = mongoose.model<userDocument>('user', userSchema);

export default userModel;