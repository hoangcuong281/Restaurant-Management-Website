import { sign_up } from '../controllers/auth.controller.js'
import express from "express";
const router = express.Router();

router.post('/', sign_up);

export default router;
