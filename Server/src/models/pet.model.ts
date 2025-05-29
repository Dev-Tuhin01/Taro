import mongoose, {Document} from "mongoose";

export interface PetDocument extends mongoose.Document {
  ownerId?: mongoose.Types.ObjectId;
  name: string;
  type: "dog" | "cat" | "penguin" | "ox";
  variant: "normal" |"fat" | "thin";
  hunger: number;
  stamina: number;
  maxHunger: number;
  maxStamina: number;
  mood: number;
  livingConditions: number;
  filth: number;
  state: "normal"| "malnourished" | "obese"| "exhausted"| "dirty";
  lastFed: number;  
  lastExercised: number;  
  lastCleaned : number;  
  lastUpdated : number;  
  createdAt: number;  
};

const petSchema = new mongoose.Schema<PetDocument>({
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
    type: Number,
    default: Date.now()
  },
  lastExercised: {
    type: Number,
    default: Date.now()
  }, 
  lastCleaned: {
    type: Number,
    default: Date.now()
  },
  lastUpdated: {
    type: Number,
    default: Date.now()
  },
  createdAt: {
    type: Number,
    default: Date.now()
  }
});

const Pet = mongoose.model<PetDocument>("pet",petSchema);

export default Pet;
