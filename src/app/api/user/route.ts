// get user data like name, and oauth accounts

import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";


export const GET = auth(async (req) => {
    try{
        
        if(!req.auth){
            return NextResponse.json({message: "Not authenticated"}, {status: 401});
        }

        const user = req.auth?.user;
        
        await dbConnect();

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
          }

        const userId = new Types.ObjectId(user?.id);
        const userData = await User.findById(userId).select('name oauthAccounts email').exec();
        
        if(!userData){
            return NextResponse.json({message: "No user found"}, {status: 404});
        }
     
        return NextResponse.json({message: 'Successfully fetched user data', userData});
    }
    catch(error){
        return NextResponse.json({message: "Error getting user data", error}, {status: 500});
    }
})