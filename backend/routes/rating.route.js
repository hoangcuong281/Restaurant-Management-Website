import {createRating, getRatings, deleteRating} from '../controllers/rating.controller.js';
import verify_token from '../middleware/token_action.js';
import express from "express";

const router = express.Router();

router.post("/", verify_token, createRating);
router.get("/", getRatings);
router.delete("/:id", verify_token, deleteRating);

export default router;