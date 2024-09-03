import mongoose, { Schema, model, Document } from 'mongoose';

interface OAuthAccount {
  provider: string;
  providerAccountId: string;
}

interface User extends Document {
  name: string;
  image: string;
  email: string;
  isVerified: boolean;
  isProUser: boolean;
  oauthAccounts: OAuthAccount[];
  spaces: Schema.Types.ObjectId[];
}

const oauthAccountSchema = new Schema<OAuthAccount>({
  provider: {
    type: String,
    enum: ['google', 'github'],
    required: true,
  },
  providerAccountId: {
    type: String,
    required: true,
  }
});

const userSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,  // cloudinary url || provider url
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isProUser: {
    type: Boolean,
    default: false,
  },
  oauthAccounts: [oauthAccountSchema],
  spaces: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Space',
    },
  ],
}, { timestamps: true });

const User = mongoose.models?.User || model<User>('User', userSchema);

export default User;
