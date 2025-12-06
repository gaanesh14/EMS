import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/connection.js";
import authRouter from "./routes/authRoutes.js";
import empRoutes from "./routes/empRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// Uploads make public
app.use("/uploads", express.static("uploads"));

//Routes
app.use("/api/auth", authRouter);
app.use("/api/employee", empRoutes);
app.use("/api/department", departmentRoutes);

let PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`the server is running on ${PORT}`);
});
