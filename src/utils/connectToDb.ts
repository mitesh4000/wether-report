import mongoose from "mongoose";

const connectToDb = () => {
  mongoose
    .connect(
      process.env.MONGODB_URI ||
        "mongodb+srv://rango:wUDPbtLUp7ZDQZQr@cluster0.2bxued0.mongodb.net/Wether?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
};

export default connectToDb;
