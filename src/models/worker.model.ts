import mongoose, { Schema, Document, model } from "mongoose";

export interface Worker extends Document {
  name: string;
  role: string;
  avatar?: string;
  spaceId: Schema.Types.ObjectId;
  uniqueLink: string;
  testimonials: Schema.Types.ObjectId[];
  createdAt: Date;
}

const workerSchema = new Schema<Worker>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  role: {
    type: String,
    required: true,
    maxlength: 50,
  },
  avatar: {
    type: String,
  },
  spaceId: {
    type: Schema.Types.ObjectId,
    ref: "Space",
    required: true,
    index: true,
  },
  uniqueLink: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  testimonials: [
    {
      type: Schema.Types.ObjectId,
      ref: "Testimonial",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const WorkerModel = mongoose.models?.Worker || model<Worker>("Worker", workerSchema);
export default WorkerModel;
