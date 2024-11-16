import mongoose from "mongoose";

function dbConnect() {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("DB connected successfully");
    })
    .catch((error) => {
      console.log("Error occured while connecting to mongodb : ", error);
    });
}

export default dbConnect;
