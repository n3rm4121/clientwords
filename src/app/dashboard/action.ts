'use server'

import { auth, signOut } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import LoveGallery from "@/models/loveGallery.model";
import Space from "@/models/space.model";
import TestimonialCard from "@/models/testimonial-card.model";
import Testimonial from "@/models/testimonials.model";
import User from "@/models/user.model";
import { Types } from "mongoose";

export async function fetchSpaceData() {
  try {
    const session = await auth();
    if (!session) {
      return null;
    }

    const userId = new Types.ObjectId(session?.user?.id);

    const spaceData = await Space.aggregate([
      {
        $match: {
          owner: userId
        }
      },
      {
        $addFields: {
          testimonialsCount: {
            $size: {
              $ifNull: ["$testimonials", []]  // Ensure testimonials is an array, or default to an empty array
            }
          }
        }
      },
      {
        $project: {
          name: 1,
          testimonialsCount: 1,
          _id: 0
        }
      }
    ]);

    return spaceData;
  } catch (error) {
    console.error("Error fetching space data:", error);
    throw error;
  }
}

export async function updateName(userId: string, newName: string) {
  await dbConnect();

  const user = await User.findByIdAndUpdate(userId, { name: newName }, { new: true });
  return user?.name;
}

export async function deleteAccount(userId: string) {
  await dbConnect();

  try {
    // delete everything related to this user from all models collectoin
    const spaceId = await Space.findOne({ owner: userId }).select('_id').exec();
    await TestimonialCard.deleteMany({ spaceId });
    await Space.deleteMany({ owner: userId });
    await LoveGallery.deleteMany({ owner: userId });
    await User.findByIdAndDelete(userId);
    signOut();

  } catch (error) {
    console.error("Error deleting user account:", error);
    throw error;

  }
}

export async function disconnectOAuth(userId: string, provider: string) {
  await dbConnect();

  try {
    await User.findByIdAndUpdate(userId, { $pull: { oauthAccounts: { provider } } });

  } catch (error) {
    console.error("Error disconnecting OAuth provider:", error);
    throw error

  }
}

export async function completeOnboarding(userId: string) {
  await dbConnect();

  try {
    await User.findByIdAndUpdate(userId, { isNewUser: false });

  }
  catch (error) {
    console.error("Error completing onboarding:", error);
    throw error;
  }
}

export async function deleteSpace(spaceId: string) {
  await dbConnect();
  const session = await auth();
  const userId = session?.user?.id;

  try {
    const space = Space.findById(spaceId);

    await LoveGallery.deleteMany({ spaceId });
    await TestimonialCard.deleteMany({ spaceId });
    await Testimonial.deleteMany({ spaceId });
    await Space.findByIdAndDelete(spaceId);
    await User.findByIdAndUpdate(userId, { $pull: { spaces: spaceId } });
    await space.deleteOne();

  } catch (error) {
    console.error("Error deleting space:", error);
    throw error;
  }
}


export async function getUserSpaceCount(userId: string) {
  await dbConnect();

  try {
    const count = await Space.countDocuments({ owner: userId });
    return count;
  } catch (error) {
    console.error("Error getting space count:", error);
    throw error;
  }
}


export async function isPro(userId: string) {
  await dbConnect();

  try {
    const user = await User.findById(userId);
    return user?.isPro || false;
  } catch (error) {
    console.error("Error getting user pro status:", error);
    throw error;
  }
}


export async function deleteTestimonial(testimonialId: string, spaceId?: string) {
  await dbConnect();
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return null;
  }

  try {
    await Testimonial.findByIdAndDelete(testimonialId);

    await Space.findByIdAndUpdate(
      spaceId,
      { $pull: { testimonials: testimonialId } }
    );

    const updatedSpace = await Space.findById(spaceId);
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    throw error;
  }
}


export async function getUserSubscriptionTier(userId: string) {
  await dbConnect();

  try {
    const user = await User.findById(userId).select('subscriptionTier').exec();
    return user?.subscriptionTier;

  }
  catch (error) {
    console.error("Error getting user subscription tier:", error);
    throw error;
  }
}

