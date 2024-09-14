import mongoose from 'mongoose';

export default async function dbConnect() {
    const uri = process.env.MONGODB_URI;
    const DB_NAME = process.env.DB_NAME;

    if (!uri) {
        throw new Error(
            'Please define the MONGODB_URI environment variable inside .env.local'
        );
    }
    // Check if we are already connected to the database
    if (mongoose.connection.readyState >= 1) {
        
        return mongoose.connection.asPromise();
    }

    // If not connected, connect to the database
    return await mongoose.connect(`${uri}/${DB_NAME}`)
}
