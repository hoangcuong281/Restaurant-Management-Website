import { getAllBooking, getBookingByUser, createBooking, updateBooking, deleteBooking } from "../controllers/booking.controller.js";
import express from 'express';
import verify_token from "../middleware/token_action.js";

const router = express.Router();

router.get('/', verify_token, getAllBooking);
router.get('/:id', verify_token, getBookingByUser);
router.post('/create/', verify_token, createBooking);
router.put('/upd/:id', verify_token, updateBooking);
router.delete('del/:id', verify_token, deleteBooking);

export default router;