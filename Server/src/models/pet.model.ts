import mongoose, {Document} from "mongoose";

export interface petDocument extends mongoose.Document {
  ownerId?: mongoose.Types.ObjectId;
  name: string;
  type: "dog" | "cat" | "penguin" | "ox";
  variant: "normal" |"fat" | "thin;"
  hunger: number;
  stamina: number;
  maxHunger: number;
  maxStamina: number;
  mood: number;
  livingConditions: number;
  filth: number;
  state: string;
  lastFed: Date;  
  lastExercised: Date;  
  lastCleaned : Date;  
  lastUpdated : Date;  
  createdAt: Date;  
};

const petSchema = new mongoose.Schema<petDocument>({
  ownerId: {
    type:mongoose.Types.ObjectId,
    ref: "user",
    required:true
  },
  name: {
    type: String,
    required:true
  },
  type: {
    type: String,
    enum: ["dog", "cat", "penguin","ox"],
    required:true
  },
  variant: {
    type: String,
    enum: ["normal", "fat", "thin"],
    default: "normal"
  },
  hunger: {
    type: Number,
    default: 240
  }, 
  stamina:{
    type: Number,
    default:120
  },
  maxHunger: {
    type: Number,
    default: 240
  },
  maxStamina: {
    type: Number,
    default: 120
  },
  mood: {
    type: Number,
    default:80
  },
  livingConditions: {
    type: Number,
    default: 255
  }, 
  filth: {
    type: Number,
    default: 0
  }, 
  state: {
    type: String,
    enum: ["normal", "malnourished", "obese", "exhausted", "dirty"],
    default: "normal"
  },
  lastFed: {
    type: Date,
    default: Date.now
  },
  lastExercised: {
    type: Date,
    default: Date.now
  }, 
  lastCleaned: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const petModel = mongoose.model<petDocument>("pet",petSchema);

export default petModel;
