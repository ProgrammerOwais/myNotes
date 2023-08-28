const mongoose = require("mongoose");
let isConnected = false;
const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("MongoDb is already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "Technotes",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("mongodb is now connected");
  } catch (error) {
    console.log("the error while connecting mongodb: ", error);
  }
};
module.exports = connectToDB;
