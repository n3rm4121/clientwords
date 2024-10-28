import mongoose, { Schema, Document, model } from "mongoose";

interface Testimonial extends Document {
    userName: string;
    userAvatar: string;
    userIntro: string;
    message: string;
    spaceId: Schema.Types.ObjectId;
    createdAt: Date;
    owner: Schema.Types.ObjectId;
    spaceName: string;
}

const testimonialSchema = new Schema<Testimonial>({
    userName: {
        type: String,
        required: true,
        max: 50,
        min: 3,
    },
    userAvatar: {
        type: String,
    },
    userIntro: {
        type: String,
        max: 50
    },
    message: {
        type: String,
        max: 500,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    spaceName: {
        type: String,
        required: true,
    },
    spaceId: {
        type: Schema.Types.ObjectId,
        ref: 'Space',
        required: true,
        index: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const Testimonial = mongoose.models?.Testimonial || model<Testimonial>('Testimonial', testimonialSchema);
export default Testimonial;
