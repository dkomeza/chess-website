import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const { MONGO_URI } = process.env;

mongoose.set("strictQuery", true);

export default function connect() {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
}
