import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import WorkerModel from "@/models/worker.model";
import Space from "@/models/space.model";

export const GET = auth(async function GET(req) {
  if (!req.auth) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  await dbConnect();
  const url = new URL(req.url);
  const spaceId = url.searchParams.get("spaceId");

  if (!spaceId) {
    return NextResponse.json({ message: "spaceId is required" }, { status: 400 });
  }

  try {
    const workers = await WorkerModel.find({ spaceId });
    return NextResponse.json({ message: "Successfully fetched workers", workers });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching workers", error }, { status: 500 });
  }
});

export const POST = auth(async function POST(req) {
  if (!req.auth) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  await dbConnect();

  try {
    const body = await req.json();
    const { name, role, avatar, spaceId } = body;

    if (!name || !role || !spaceId) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const space = await Space.findById(spaceId);
    if (!space) {
       return NextResponse.json({ message: "Space not found" }, { status: 404 });
    }

    // Verify ownership
    if (space.owner.toString() !== req.auth.user?.id) {
       return NextResponse.json({ message: "Unauthorized to add workers to this space" }, { status: 403 });
    }

    // Generate unique link base on space link and worker name
    const uniqueLink = `${space.uniqueLink}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

    const newWorker = new WorkerModel({
      name,
      role,
      avatar,
      spaceId,
      uniqueLink
    });

    await newWorker.save();
    
    // Update space
    await Space.findByIdAndUpdate(spaceId, { $push: { workers: newWorker._id } });

    return NextResponse.json({ message: "Worker created successfully", worker: newWorker });
  } catch (error) {
    console.error("Error creating worker:", error);
    return NextResponse.json({ message: "Error creating worker", error }, { status: 500 });
  }
});
