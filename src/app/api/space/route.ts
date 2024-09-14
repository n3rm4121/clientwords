import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import Space from "@/models/space.model";
import { generateUniqueLink } from "@/utils/generateUniqueLink";
import { Types } from "mongoose";
import User from "@/models/user.model";
import { canCreateSpace } from "@/lib/featureAccess";
// get all space of user
export const GET = auth(async function GET(req, ) {
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
            testimonialsCount: { $size: "$testimonials" }
          }
        }
      ]);
      
      if (spaces.length === 0) {
        return NextResponse.json({ message: "No spaces found" }, { status: 200 });
      }
  
      return NextResponse.json({message: 'Successfully fetched spaces', spaces });
  
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
    const body = await req.json(); // Parse the body as JSON
    const { name } = body; // Extract the `name` property from the parsed body
 
      const eligibleUser = await User.findById(user?.id).select('spaces subscriptionTier')
    console.log(eligibleUser);
     const can = canCreateSpace(eligibleUser.subscriptionTier, eligibleUser.spaces.length);
     console.log(can);
    if(!can) {
      return NextResponse.json({ message: "You have reached the limit of creating space" }, { status: 400 });
    }
    let space = await new Space({ name, owner: user?.id });

   // add this space id into User's space array
    await User.findByIdAndUpdate({_id: user?.id}, { $push: { spaces: space._id } });
    
    const uniqueLink = generateUniqueLink(name, space._id);
    
    // add unique Link to the space
    space.uniqueLink = uniqueLink;
    space = await space.save();

    if(!space) {
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
