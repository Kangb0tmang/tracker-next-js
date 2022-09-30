// Database Collection

import mongoose, { Schema } from 'mongoose';

export const HabitsScheme = new Schema({
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.models.habits || mongoose.model('habits', HabitsSchema);
