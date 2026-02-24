import { sign_up, log_in } from '../controllers/auth.controller.js'
import express from "express";
const router = express.Router();

router.post('/', sign_up);
router.post('/log-in/', log_in);

export default router;
