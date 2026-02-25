import express from 'express';
import { getMenu, getMealById, createMeal, updateMeal, deleteMeal } from '../controllers/meal.controller.js';

const router = express.Router();

router.get('/menu/', getMenu);
router.get('/:id', getMealById);
router.post('/cre_meal/', createMeal);
router.put('/upd_meal/:id', updateMeal);
router.delete('/del_meal/:id', deleteMeal);

export default router;