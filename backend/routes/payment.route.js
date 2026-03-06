import express from "express";
import { createPayment, getPayments, updatePayment } from "../controllers/payment.controller.js";

import verify_token from "../middleware/token_action.js";
const router = express.Router();

router.post('/create/', verify_token, createPayment);
router.get('/', verify_token, getPayments);
router.put('/update/:payment_id', verify_token, updatePayment);

export default router;
