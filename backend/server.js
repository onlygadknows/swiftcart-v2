import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import connectDB from "./config/config.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
// import products from './data/products.js';
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
const port = process.env.PORT || 5000;
connectDB();

const app = express();
// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
// app.use(cors());
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, // If you need to send cookies
}));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
