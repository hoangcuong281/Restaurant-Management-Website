import { sign_up, log_in, check_token } from '../controllers/auth.controller.js'
import express from "express";
const router = express.Router();

router.post('/', sign_up);
router.post('/log-in/', log_in);
router.post('/check-token/', check_token);

export default router;
