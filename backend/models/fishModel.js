import { Schema } from 'mongoose';

const fishSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  available: {
    type: Boolean,
    default: true
  },
  createDate: {
    type: Date,
    default: Date.now
  },
});

export default fishSchema;
