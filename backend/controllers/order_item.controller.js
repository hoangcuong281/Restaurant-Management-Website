import OrderItem from '../models/order_item.model.js';

export const getOrderItemsByOrder = async (req, res) => {
    try {
        const orderItems = await OrderItem.findByOrder(req.params['id']);
        return res.status(200).json(orderItems);
    } catch (error) {
        return res.status(500).json({message: 'Failed to fetch order items!'});
    }
}

export const createOrderItem = async (req, res) => {
    const { meal_id, order_id, quantity, note = null} = req.body;
    if (!meal_id || !order_id || !quantity) {
        return res.status(400).json({message: 'Missing required fields!'});
    }
    console.log(meal_id, order_id, quantity, note)
    try {
        await OrderItem.create(meal_id, order_id, quantity, note);
        return res.status(201).json({message: 'Order item created successfully!'});
    } catch (error) {
        return res.status(500).json({message: 'Failed to create order item!'});
    }
}

export const updateOrderItem = async (req, res) => {
    const allowedFields = ['quantity', 'note', 'price_at_time'];

    const unknownFields = Object.keys(req.body).filter(field => !allowedFields.includes(field));

    const meal_id = req.params['meal_id'];
    const order_id = req.params['order_id'];

    if (unknownFields.length > 0) return res.status(400).json({message: 'Invalid fields'});
    try {
        await OrderItem.update(req.body, order_id, meal_id);
        return res.status(200).json({message: 'Order item updated successfully!'});
    } catch (error) {
        return res.status(500).json({message: 'Failed to update order item!'});
    }
}

export const getAllOrderItems = async (req, res) => {
    try {
        const orderItems = await OrderItem.read();
        return res.status(200).json(orderItems);
    } catch (error) {
        return res.status(500).json({message: 'Failed to fetch order items!'});
    }
}

export const deleteOrderItem = async (req, res) => {
    const meal_id = req.params['meal_id'];
    const order_id = req.params['order_id'];
    if (!meal_id || !order_id) {
        return res.status(400).json({message: 'Missing required fields!'});
    }
    try {
        await OrderItem.delete(meal_id, order_id);
        return res.status(200).json({message: 'Order item deleted successfully!'});
    } catch (error) {
        return res.status(500).json({message: 'Failed to delete order item!'});
    }
}