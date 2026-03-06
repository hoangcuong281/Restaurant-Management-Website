import { getOrderItemsByOrder, createOrderItem, updateOrderItem, getAllOrderItems, deleteOrderItem } from '../controllers/order_item.controller.js';
import express from 'express';

const router = express.Router();

router.get('/:id', getOrderItemsByOrder);
router.post('/', createOrderItem);
router.put('/:order_id/:meal_id', updateOrderItem);
router.get('/', getAllOrderItems);
router.delete('/:order_id/:meal_id', deleteOrderItem);

export default router;