import { createTable, readTable, updateTable, deleteTable} from '../controllers/restaurant_table.controller.js';
import verify_token from '../middleware/token_action.js';
import express from 'express';

const router = express.Router();

router.post('/create', verify_token, createTable);
router.put('/update/:id', verify_token, updateTable);
router.get('/', verify_token, readTable);
router.delete('/delete/:id', verify_token, deleteTable);

export default router;