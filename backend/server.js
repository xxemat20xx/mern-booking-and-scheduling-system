import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import path from 'path';

// routes
import authRoutes from './routes/auth.routes.js'
import bookRoutes from './routes/booking.routes.js'

dotenv.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

const app = express();

app.use(cookieParser()); 
app.use(express.json()); 
app.use(cookieParser()); 

// cors
app.use(cors({
  origin: 'http://localhost:5173', // frontend URL
  credentials: true,
}));


// Routes
app.use('/api/auth', authRoutes );
app.use('/api/book', bookRoutes );

// Serve static files from the React frontend app
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../frontend/dist');

  app.use(express.static(frontendPath));

  // React Router fallback (Node 22 safe)
  app.use((req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port: ${PORT}`);
});