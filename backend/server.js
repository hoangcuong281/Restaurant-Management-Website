import express from "express";
import cors from 'cors';
import mealRoutes from './routes/meal.route.js';
import paymentRoutes from './routes/payment.route.js';
import bookingRoutes from './routes/booking.route.js';
import authRoutes from './routes/auth.route.js';
import ratingRoutes from './routes/rating.route.js';
import eventRoutes from "./routes/event.route.js";
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/api/meal', mealRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/rating', ratingRoutes);
app.use('/api/event', eventRoutes);

app.listen(port, () => {});
