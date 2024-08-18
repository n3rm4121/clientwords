// custom form of testimonial

import mongoose, {Schema, Document, model} from "mongoose";

interface TestimonialCard extends Document{
    companyName: string;
    companyLogo: string;
    companyURL: string;
    placeholder: string;
    promptText: string;
    space: Schema.Types.ObjectId;
}

const testimonialCardSchema = new Schema<TestimonialCard>({
   
    space: {
        type: Schema.Types.ObjectId,
        ref: 'Space',
        // required: true,  TODO: uncomment this line
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

const TestimonialCard = mongoose.models?.TestimonialCard || model<TestimonialCard>('TestimonialCard', testimonialCardSchema);

export default TestimonialCard;