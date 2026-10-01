import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const baseUrl = process.env.MONGO_DB_URL;   // ends with /?appName=Cluster0
        const dbName  = process.env.MONGO_DB_NAME;  // InterVue

        // Insert dbName BEFORE the '?' so the connection string is valid:
        // mongodb+srv://host/InterVue?appName=Cluster0
        const connectionUrl = baseUrl.includes("?")
            ? baseUrl.replace("?", `${dbName}?`)
            : `${baseUrl}/${dbName}`;

        await mongoose.connect(connectionUrl);
        console.log("Database Connected!! →", dbName);
    } catch (error) {
        console.log("Error in connecting Database ", error);
    }
}

export default connectDB;