import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import Space from '@/models/space.model';
import dbConnect from '@/lib/dbConnect';

export const GET = auth(async function GET(req, {params}){

  const { id } = params as { id: string };

  if (!req.auth) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const user = req.auth.user;

  dbConnect();
  
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  try {
    if (id) {
      // Fetch specific space by ID
      const space = await Space.findOne({ owner: user.id, _id: id });

      if (!space) {
        return NextResponse.json({ message: "No space found" }, { status: 404 });
      }

      return NextResponse.json({ message: 'Successfully fetched space', space });
    } else {
      return NextResponse.json({ message: "Space ID not provided" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error getting space", error },
      { status: 500 }
    );
  }
});
