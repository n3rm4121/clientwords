import mongoose, { Schema, model, Document } from 'mongoose';

interface User extends Document {
    name: string;
    image: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    isVerified: boolean;
    isProUser: boolean;
    authProviderId: string;
    authProvider: string;
    spaces: Schema.Types.ObjectId[];
}

const userSchema = new Schema<User>({
    name: {
        type: String,
        // required: true,
    },
    image:{
        type: String,  // cloudinary url || provider url
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isProUser: {
        type: Boolean,
        default: false,
    },
    authProviderId: {
        type: String,
    },
    authProvider: {
        type: String,
        enum: ['google', 'github'],
      },
      spaces: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Space',
        },
      ], 
      

}, {timestamps: true});

const User = mongoose.models?.User || model<User>('User', userSchema);

export default User;