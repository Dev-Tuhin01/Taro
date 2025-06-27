import mongoose, { Schema, type Document } from "mongoose";

export interface ChoreDocument extends Document {
  parentId: mongoose.Types.ObjectId;
  childId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  bounty: number;
  status: "pending" | "completed" | "approved" | "rejected";
  completedAt?: Date;
  approvedAt?: Date;
  createdAt: Date;
}

const choreSchema = new Schema<ChoreDocument>({
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  childId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  bounty: {
    type: Number,
    min: 10,
    max: 100,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "approved", "rejected"],
    default: "pending",
  },
  completedAt: {
    type: Date,
  },
  approvedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Chore = mongoose.model<ChoreDocument>("chore", choreSchema);
export default Chore;
