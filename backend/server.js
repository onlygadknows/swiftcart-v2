import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
dotenv.config();
import connectDB from "./config/config.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
// import products from './data/products.js';
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from './routes/uploadRoutes.js';

import cookieParser from "cookie-parser";
const port = process.env.PORT || 5000;
connectDB();

const app = express();
// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // If you need to send cookies
  })
);


app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads"))); // Correctly set up static file serving

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use('/api/upload', uploadRoutes);

if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  //any route that is not api will be redirected to index.html
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')));
} else {
  app.get('/', (req, res) => {
      res.send('API is running')
  });
  
}


app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
