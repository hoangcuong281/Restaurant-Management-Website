import express from "express";
import cors from 'cors';
import mealRoutes from './routes/meal.route.js';
import eventRoutes from "./routes/event.route.js";
import bookingRoutes from './routes/booking.route.js';
import orderRoutes from './routes/order.route.js';
import orderItemRoutes from './routes/order_item.route.js';
import ratingRoutes from './routes/rating.route.js';
import restaurantTableRoute from './routes/restaurant_table.route.js';
import paymentRoutes from './routes/payment.route.js';
import authRoutes from './routes/auth.route.js';
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/api/meal', mealRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/rating', ratingRoutes);
app.use('/api/restaurant-table', restaurantTableRoute);
app.use('/api/event', eventRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/order-item', orderItemRoutes);

app.listen(port, () => {});
