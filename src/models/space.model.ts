import mongoose, { Schema, model } from "mongoose";

interface Space extends Document {
  name: string; // unique
  owner: Schema.Types.ObjectId;
  testimonials: Schema.Types.ObjectId[];
  isNewSpace: boolean;
  uniqueLink: string;
  createdAt: Date;
}

const spaceSchema = new Schema<Space>({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    trim: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isNewSpace: {
    type: Boolean,
    default: true,
  },

  testimonials: [
    {
      type: Schema.Types.ObjectId,
      ref: "Testimonial",
    },
  ],
  uniqueLink: {
    type: String,
    required: true,
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Space = mongoose.models?.Space || model<Space>("Space", spaceSchema);
export default Space;
