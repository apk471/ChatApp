import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/messages.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectMongoDb from "./db/connectMongoDb.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  connectMongoDb();
  console.log(`Server is running on port ${PORT}`);
});
