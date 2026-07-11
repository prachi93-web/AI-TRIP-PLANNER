import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoute.js';
import tripRouter from './routes/tripRoute.js';
import cloudinary from "./config/cloudinary.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Database Connection
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

//api endpoints
app.use('/api/user', userRouter);
app.use('/api/trip', tripRouter);

// Test Route
app.get("/", (req, res) => {
    res.send("API Working");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server Started on PORT : ${PORT}`);
});