//testimonail received by the space owner from the users who have visited the space
// data of sender
import mongoose, {Schema, Document, model} from "mongoose";

interface Testimonial extends Document{
    userName: string;  
    userAvatar: string;   
    userIntro: string;  
    message: string;
    spaceId: Schema.Types.ObjectId;  
    createdAt: Date;
}

const testimonialSchema = new Schema<Testimonial>({
    userName: {
        type: String,
        required: true,
    },
    userAvatar: {
        type: String,
    },
    userIntro: {
        type: String,
        
    },
    message: {
        type: String,
        required: true,
    },
    spaceId: {
        type: Schema.Types.ObjectId,
        ref: 'Space',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {timestamps: true});

const Testimonial = mongoose.models?.Testimonial || model<Testimonial>('Testimonial', testimonialSchema);
export default Testimonial;
