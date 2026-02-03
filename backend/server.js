import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';

// routes
import authRoutes from './routes/auth.routes.js'

dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();
app.use(cookieParser()); 

// cors
app.use(cors({
  origin: 'http://localhost:5173', // frontend URL
  credentials: true,
}));

app.use(express.json()); 
app.use(cookieParser()); 

// Routes
app.use('/api/auth', authRoutes );

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port: ${PORT}`);
});