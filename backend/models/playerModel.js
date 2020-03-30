import { Schema } from 'mongoose';

const playerSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  speed: {
    type: Number,
    enum: [1, 2, 3]
  },
  createDate: {
    type: Date,
    default: Date.now
  }
});

export default playerSchema;
