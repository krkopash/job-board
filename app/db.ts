import mongoose from "mongoose";

const mongodbUri = process.env.MONGODB_URI;
if (!mongodbUri) {
  throw new Error("MONGODB_URI environment variable is not defined");
}

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalWithMongoose = globalThis as typeof globalThis & {
  mongoose?: MongooseCache;
};

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
}

const cached = globalWithMongoose.mongoose;

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongodbUri, {}).then((mongooseInstance) => {
      cached.conn = mongooseInstance;
      return mongooseInstance;
    });
  }

  return cached.promise;
}

export default connectDB;
 

 
// process.on("SIGINT", () => {
//   connection
//     .close()
//     .then(() => {
//       console.log(
//         "%s Mongoose default connection is disconnected due to application termination.",
//         "✗"
//       );
//       process.exit(0);
//     })
//     .catch((err:any) => {
//       console.log("Error in closing database connection", err);
//     });
// });
 

 


// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();
// const connectDB = async () => {
//     try {
//        await mongoose?.connect(process.env.MONGO_URL!);
//        console.log("db connected");
//     }
//     catch(error){
//         console.log("db not connected", error); 

//     }

// }

// export default connectDB;