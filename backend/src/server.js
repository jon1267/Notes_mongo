import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

//cors middleware
if (process.env.NODE_ENV !== 'production') {
  app.use(cors({
    origin: 'http://localhost:5173',
  }));
}

// this middleware will parse JSON body: {title, content} = req.body;
app.use(express.json());
// from time 1:33:00 upstash.com to time 1:45:00 create rateLimiter
// app.use(rateLimiter);

app.use('/api/notes', notesRoutes);

app.use(express.static(path.join(__dirname, '../frontend/dist')));

if (process.env.NODE_ENV === 'production') {
  app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname,'../frontend','dist', 'index.html'));
  });
}

connectDB().then( () => {
  app.listen(PORT, () => {
    console.log('Server start on PORT:',PORT);
  });
});

