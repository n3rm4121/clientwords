import mongoose, {Schema, model} from "mongoose";

interface Space extends Document{
    name: string;
    owner:Schema.Types.ObjectId;
    testimonials: Schema.Types.ObjectId[];
    createdAt: Date;
}


const spaceSchema = new Schema<Space>({
    name: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    testimonials: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Testimonial',
        },
    ],
  
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Space = mongoose.models?.Space || model<Space>('Space', spaceSchema);
export default Space;