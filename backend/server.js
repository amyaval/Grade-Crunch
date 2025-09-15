import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

//import routes
import authRoutes from './routes/auth.js';

const app = express();

const corsOptions = {
    origin: ["http://localhost:3000"],
    credentials: true
}

app.use(cors(corsOptions));
app.use(express.json());

//connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
        console.log('Database:', mongoose.connection.db.databaseName);
    })
    .catch((error) => {
        console.error('MongoDB connection error: ', error);
    });

//routes
app.use('/api/auth', authRoutes);

//health check route
app.get('/api/health', (req, res) => {
    res.json({ message: 'Server is running!' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});