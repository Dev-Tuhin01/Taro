import mongoose from "mongoose";

export interface choreDocument extends mongoose.Document {
  parentId?: mongoose.Types.ObjectId;
  childId?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  bounty: number;
  status: "pending" | "completed" | "approved" | "rejected";
  completedAt: number;
  approvedAt: number;
  createdAt: number;
};

const choreSchema = new mongoose.Schema<choreDocument>({
  parentId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true
  },
  childId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  bounty: {
    type: Number,
    min: 10,
    max: 100,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "completed", "approved", "rejected"],
    default: "pending"
  },
  completedAt: Number,
  approvedAt: Number,
  createdAt: {
    type:Number,
    default:Date.now()
  },
});

const Chore = mongoose.model<choreDocument>("chore", choreSchema);
export default Chore;