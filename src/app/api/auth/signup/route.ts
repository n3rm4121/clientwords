import dbConnect from '@/lib/dbConnect';
import { NextResponse } from 'next/server';
import User from '@/models/user.model';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    await dbConnect();
    try {

        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }
        
        const user = await User.findOne({ email });
        if(user){
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password:hashedPassword });
        await newUser.save();

    
        return NextResponse.json({ message: 'Signup successful' });

    } catch (error) {
        console.error('Signup error:', error);  
        return NextResponse.json({ error: error}, { status: 500 });
    }
}
