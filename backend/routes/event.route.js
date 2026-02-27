import {createEvent, getEvents, updateEvent, deleteEvent} from '../controllers/event.controller.js';
import express from 'express';
import verify_token from '../middleware/token_action.js';

const router = express.Router();

router.post('/create', verify_token, createEvent);
router.get('/', getEvents);
router.put('/upd_event/:id', verify_token, updateEvent);
router.delete('/:id', verify_token, deleteEvent);

export default router;

