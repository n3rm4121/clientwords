'use server'

import { auth } from "@/auth";
import Space from "@/models/space.model";
import { Types } from "mongoose";

export async function fetchSpaceData() {
  try {
    const session = await auth()
    if (!session) {
      console.log("No session found");
      return null;
    }
    
    const userId = new Types.ObjectId(session?.user?.id)
    
    const spaceData = await Space.aggregate([
      {
        $match: {
          owner: userId
        }
      },
      {
        $addFields: {
          testimonialsCount: { $size: "$testimonials" }
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

    console.log("Space data fetched:", spaceData);
    return spaceData;
  } catch (error) {
    console.error("Error fetching space data:", error);
    throw error;
  }
}