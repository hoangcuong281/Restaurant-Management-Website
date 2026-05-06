import express from 'express';
import { search_users } from '../controllers/user.controller.js';

const router = express.Router();

// GET /api/users?q=alice
router.get('/', search_users);

export default router;
