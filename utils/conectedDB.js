import mongoose from "mongoose";

async function conectedDB() {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGO_URI);
  console.log("conected DB.");
}
export default conectedDB;
