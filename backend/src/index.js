import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js"


dotenv.config()
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());


app.use("/api/auth",authRoutes)
app.use("/api/messages", messageRoutes);

const port=process.env.PORT
app.listen(port, () => {
    console.log(`Server started on PORT ${port}`);
    connectDB();
});
