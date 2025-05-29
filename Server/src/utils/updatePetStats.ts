import path from "path";
import { PetDocument } from "../models/pet.model.ts"

const updatePetStat = (pet:PetDocument):void => {
  const now = Date.now();
  const hoursSinceLastUpdate = (now - pet.lastUpdated) / (1000 * 60 * 60);

  // update hunger

  let hungerDecrease = 10 * hoursSinceLastUpdate;
  if (pet.variant === "thin") {
    hungerDecrease = 7 * hungerDecrease;
  } 
  if (pet.variant === "fat") {
    hungerDecrease = 14 * hungerDecrease;
  }

  pet.hunger = Math.max(0, pet.hunger - hungerDecrease);

  // update living condition based on filth 

  pet.filth += Math.floor(7.5 * hoursSinceLastUpdate); // average filth per hour = 7.5
  pet.livingConditions = Math.max(0, 255 - pet.filth);

  // update state

  if (pet.hunger < (pet.maxHunger * 0.25)) {
    pet.state = "malnourished";
  } else if (pet.hunger > (pet.maxHunger * 0.9)) {
    pet.state = "obese";
  } else if (pet.stamina < 20) {
    pet.state = "exhausted";
  } else if (pet.livingConditions < 20) {
    pet.state = "dirty";
  } else {
    pet.state = "normal";
  }

  // update mood based on all factors

  let moodfactor = 0;
  moodfactor += (pet.hunger / pet.maxHunger) * 25;
  moodfactor += (pet.stamina / pet.maxStamina) * 25;
  moodfactor += (pet.livingConditions / 255) * 25;

  // excerise factor
  const hoursSinceExcersize = ( now - pet.lastExercised ) / (1000 * 60 * 60 );
  if ( hoursSinceExcersize < 24 ){
    moodfactor += 25;
  } 

  pet.mood = Math.round(moodfactor);
  pet.lastUpdated = now;
}

export default updatePetStat;