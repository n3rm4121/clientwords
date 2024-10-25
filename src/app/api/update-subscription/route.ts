import { auth } from "@/auth";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";


export const POST = auth(async function POST(req: NextRequest) {
    const { userId, eventData } = await req.json();

    if (!userId || !eventData) {
        return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    const session = await auth();
    const sessionUser = session?.user?.id;
    if (!sessionUser) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    // check if the user is the same as the one who made the request
    if (userId != sessionUser && userId != eventData.custom_data.user_id) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }


    const dbUser = await User.findById(userId).exec();
    if (!dbUser) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    // update the user's subscription tier
    dbUser.subscriptionTier = eventData?.items[0].product.name;
    // update the user's subscription end date by adding 30 days to the date in the database
    // if the user has a subscription end date in the database
    if (dbUser.subscriptionEndDate) {
        dbUser.subscriptionEndDate = new Date(new Date(dbUser.subscriptionEndDate).setDate(new Date(dbUser.subscriptionEndDate).getDate() + 30));
    }
    // if the user does not have a subscription end date in the database
    else {
        dbUser.subscriptionEndDate = new Date(new Date().setDate(new Date().getDate() + 30));
    }
    await dbUser.save();

    return NextResponse.json({ message: "Subscription updated successfully" }, { status: 200 });



});