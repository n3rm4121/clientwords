import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { auth } from "@/auth";


export const GET = auth(function GET(req) {
  if (!req.auth) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  return NextResponse.json({ req });
});

export const POST = auth(async function POST(req) {
    
  await dbConnect();

  if (!req.auth) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const body = await req.json(); // Parse the body as JSON
    const { name } = body; // Extract the `name` property from the parsed body

    return NextResponse.json({ message: "THis is the message", name });
  } catch (error) {
    return NextResponse.json(
      { message: "Error processing request", error },
      { status: 400 }
    );
  }
});
