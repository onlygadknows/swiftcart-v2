import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
dotenv.config()
import connectDB from './config/config.js';
import products from './data/products.js';
import productRoutes from './routes/productRoutes.js';

const port = process.env.PORT || 5000;
connectDB()

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/products/', productRoutes);



app.listen(port, () => console.log(`Server running on port ${port}`));