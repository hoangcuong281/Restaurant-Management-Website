import { getAllOrder, getOrderByBooking, createOrder, updateOrder, deleteOrder } from "../controllers/order.controller.js";
import express from "express";
import verify_token from "../middleware/token_action.js";

const router = express.Router();

router.get('/all', verify_token, getAllOrder);
router.get('/booking/:id', verify_token, getOrderByBooking);
router.post('/add', verify_token, createOrder);
router.put('/upd/:id', verify_token, updateOrder);
router.delete('/del/:id', verify_token, deleteOrder);

export default router;