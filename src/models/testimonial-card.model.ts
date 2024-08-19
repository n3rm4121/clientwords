// custom form of testimonial

import mongoose, {Schema, Document, model} from "mongoose";

export interface ITestimonialCard extends Document{
    companyName: string;
    companyLogo: string;
    companyURL: string;
    placeholder: string;
    promptText: string;
    spaceId: Schema.Types.ObjectId;
    spaceName: string;
}

const testimonialCardSchema = new Schema<ITestimonialCard>({
   
    spaceId: {
        type: Schema.Types.ObjectId,
        ref: 'Space',
        required: true,
    },
    spaceName: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    companyLogo: {
        type: String,
        required: true,
    },
    companyURL: {
        type: String,
        required: true,
    },
    placeholder: {
        type: String,
        required: true,
    },
    promptText: {
        type: String,
        required: true,
    },
    
});

const TestimonialCard = mongoose.models?.TestimonialCard || model<ITestimonialCard>('TestimonialCard', testimonialCardSchema);

export default TestimonialCard;