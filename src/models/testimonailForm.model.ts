// custom form of testimonial

import mongoose, {Schema, Document, model} from "mongoose";

interface TestimonialForm extends Document{
    companyName: string;
    companyAvatar: string;
    comapanyURL: string;
    placeholder: string;
    promptText: string;
}

const testimonialFormSchema = new Schema<TestimonialForm>({
    companyName: {
        type: String,
        required: true,
    },
    companyAvatar: {
        type: String,
        required: true,
    },
    comapanyURL: {
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

const TestimonialForm = mongoose.models?.TestimonialForm || model<TestimonialForm>('TestimonialForm', testimonialFormSchema);

