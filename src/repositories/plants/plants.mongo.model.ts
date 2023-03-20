import { Schema, model } from 'mongoose';
import { Plant } from '../../entities/plant.js';

const plantSchema = new Schema<Plant>({
  photo: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
    unique: true,
  },
  ubication: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  lightness: {
    type: String,
    required: true,
  },
  humidity: {
    type: String,
    required: true,
  },
  difficult: {
    type: String,
    required: true,
  },
  animalFriendly: {
    type: Boolean,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

plantSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject._id;
    delete returnedObject.passwd;
  },
});

export const PlantModel = model('Plant', plantSchema, 'plants');
