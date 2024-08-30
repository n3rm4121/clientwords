import mongoose, {Schema, model} from "mongoose";

interface LoveGallery extends Document {
    testimonials: {
        type: Schema.Types.ObjectId;
        ref: "Testimonial";
    }[];
    spaceId: Schema.Types.ObjectId;
    createdAt: Date;

}

const loveGallerySchema = new Schema<LoveGallery>({
    testimonials: [
        {
            type: Schema.Types.ObjectId,
            ref: "Testimonial",
        },
    ],
    spaceId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Space",
        index: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const LoveGallery = mongoose.models?.LoveGallery || model<LoveGallery>("LoveGallery", 
    loveGallerySchema);


export default LoveGallery;