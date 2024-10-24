import mongoose, { Schema, model, Document } from 'mongoose';

export enum SubscriptionTier {
  FREE = 'Free',
  PRO = 'Pro',
}

interface OAuthAccount {
  provider: string;
  providerAccountId: string;
}

interface User extends Document {
  name: string;
  image: string;
  email: string;
  isVerified: boolean;
  oauthAccounts: OAuthAccount[];
  spaces: Schema.Types.ObjectId[];
  isNewUser: boolean;
  subscriptionTier: SubscriptionTier;
  subscriptionEndDate: Date | null;
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
  isNewUser: {
    type: Boolean,
    default: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  subscriptionTier: {
    type: String,
    enum: Object.values(SubscriptionTier),
    default: SubscriptionTier.FREE,
  },
  subscriptionEndDate: {
    type: Date,
    default: null,
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