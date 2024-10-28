import config from '@/config';
import mongoose from 'mongoose';

export default async function dbConnect() {
    const uri = config.mongodbURI;
    const DB_NAME = config.dbName;

    if (!uri) {
        throw new Error(
            'Please define the MONGODB_URI environment variable inside .env.local'
        );
    }
    if (mongoose.connection.readyState >= 1) {

        return mongoose.connection.asPromise();
    }

    return await mongoose.connect(`${uri}/${DB_NAME}`)
}
