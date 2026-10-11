import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import {env} from "./config/env";
import { app } from "./app";
import { connectDB } from "./config/database";
import { createDefaultAdmin } from "./config/createDefaultAdmin";



const PORT = env.PORT || 3000;
const MONGO_URI = env.MONGO_URI;


const startServer = async () => {
  try {
    await connectDB(MONGO_URI);
    await createDefaultAdmin();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();