import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/connection.js";
import authRouter from "./routes/authRoutes.js";
import empRoutes from "./routes/empRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import salaryRoutes from "./routes/salaryRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const app = express();

app.use(
  cors({
    origin: true, // Dynamically reflects the request origin, allowing all domains/IPs while supporting credentials
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  })
);

connectDB();

// Uploads make public
app.use("/uploads", express.static("uploads"));

//Routes
app.use("/api/auth", authRouter);
app.use("/api/employee", empRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/leave", leaveRoutes);
app.use("/api/salary", salaryRoutes);
app.use("/api/upload", uploadRoutes);

let PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`the server is running on ${PORT}`);
});
