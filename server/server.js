import "dotenv/config";

import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";

import authRoutes from "./src/routes/authRoutes.js";
import documentRoutes from "./src/routes/documentRoutes.js";
import chatRoutes from "./src/routes/chatRoutes.js";
import dashboardRoutes from "./src/routes/dashboardRoutes.js";
import errorHandler from "./src/middleware/errorMiddleware.js";


// Connect Database
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/chat", chatRoutes);

app.use(errorHandler);

app.get("/", (req,res)=>{
    res.json({
        success:true,
        message:"AI Knowledge Base Backend is Running 🚀"
    });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});