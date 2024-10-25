import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import Space from "@/models/space.model";
import { generateUniqueLink } from "@/utils/generateUniqueLink";
import { Types } from "mongoose";
import User from "@/models/user.model";
import { canCreateSpace } from "@/lib/featureAccess";

export const GET = auth(async function GET(req,) {
  if (!req.auth) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const user = req.auth?.user;

  await dbConnect();


  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  try {

    const userId = new Types.ObjectId(user?.id);
    const spaces = await Space.aggregate([
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
      }
    ]);

    if (spaces.length === 0) {
      return NextResponse.json({ message: "No spaces found" }, { status: 200 });
    }

    return NextResponse.json({ message: 'Successfully fetched spaces', spaces });

  } catch (error) {
    return NextResponse.json(
      { message: "Error getting spaces", error },
      { status: 500 }
    );
  }
});


export const POST = auth(async function POST(req) {
  await dbConnect();

  const user = req.auth?.user;

  if (!req.auth) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name } = body;

    const existingSpace = await Space.findOne({ name: { $regex: new RegExp(`^${name}$`, "i") } });

    if (existingSpace) {
      return NextResponse.json(
        { message: "This name is already taken. Please choose another one." },
        { status: 400 }
      );
    }

    const eligibleUser = await User.findById(user?.id).select('spaces subscriptionTier');
    const can = canCreateSpace(eligibleUser.subscriptionTier, eligibleUser.spaces.length);

    if (!can) {
      return NextResponse.json({ message: "You have reached the limit of creating space" }, { status: 400 });
    }

    let space = new Space({ name, owner: user?.id });

    await User.findByIdAndUpdate({ _id: user?.id }, { $push: { spaces: space._id } });

    const uniqueLink = generateUniqueLink(name);

    space.uniqueLink = uniqueLink;
    space = await space.save();

    if (!space) {
      return NextResponse.json({ message: "Error creating space" }, { status: 400 });
    }

    return NextResponse.json({ message: "Space created successfully", space });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating space", error },
      { status: 400 }
    );
  }
});

