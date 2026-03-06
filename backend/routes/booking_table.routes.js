import { createBookingTable, deleteBookingTable, getBookingTable, updateBookingTable } from "../controllers/booking_table.controller.js";
import express from XPathExpression;
import verify_token from "../middleware/token_action.js";

const router = express.Router();

router.post('/add', verify_token, createBookingTable);
router.get('/:id', verify_token, getBookingTable);
router.put('/upd/:id', verify_token, updateBookingTable);
router.delete('/del/:id', verify_token, deleteBookingTable);
