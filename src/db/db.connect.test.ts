import { dbConnect } from '../db/db.connect.js';
import mongoose from 'mongoose';

jest.mock('mongoose');
jest.mock('../config.js', () => ({
  config: {
    secret: 'test',
  },
}));
describe('Given the dbconnect function', () => {
  dbConnect();

  describe('When called', () => {
    test('Then it should call the mongoose.connect', () => {
      expect(mongoose.connect).toHaveBeenCalled();
    });
  });
});
