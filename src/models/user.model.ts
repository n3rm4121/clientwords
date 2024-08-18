import mongoose, { Schema, model, Document } from 'mongoose';

interface User extends Document {
    name: string;
    image: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    isVerfied: boolean;
    isAdmin: boolean;
    isProUser: boolean;
    verifyToken: string;
    verifyTokenExpires: Date;
    forgetPasswordToken: string;
    forgetPasswordTokenExpires: Date;
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
    },
    password: {
        type: String,

        required: function() {
                return this.authProvider === 'credentials';
              },
        select: false,
    },
    isVerfied: {
        type: Boolean,
        default: function() {
            return this.authProvider != 'credentials';
        }
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isProUser: {
        type: Boolean,
        default: false,
    },
    verifyToken: {
        type: String,
    },
    verifyTokenExpires: {
        type: Date,
    },
    forgetPasswordToken: {
        type: String,
    },
    forgetPasswordTokenExpires: {
        type: Date,
    },
    authProviderId: {
        type: String,
    },
    authProvider: {
        type: String,
        enum: ['google', 'github', 'credentials'],
        default: 'credentials',
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