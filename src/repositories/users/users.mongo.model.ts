import { Schema, model } from 'mongoose';
import { User } from '../../entities/user.js';

const userSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwd: {
    type: String,
    required: true,
  },
  greenHouse: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Plant',
    },
  ],
  myPlants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Plant',
    },
  ],
});

userSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject._id;
    delete returnedObject.passwd;
  },
});

export const UserModel = model('User', userSchema, 'users');
