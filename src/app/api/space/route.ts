import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import Space from "@/models/space.model";
import { generateUniqueLink } from "@/utils/generateUniqueLink";
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
      const spaces = await Space.find({ owner: user?.id });
    
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
 
   

    let space = await new Space({ name, owner: user?.id });
    
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
