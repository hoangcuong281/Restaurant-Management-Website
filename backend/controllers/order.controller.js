import Order from '../models/order.model.js'

export const getAllOrder = async (req, res) => {
    try{
        const orders = await Order.read();
        return res.status(200).json(orders);
    }catch (error){
        return res.status(500).json({message: 'Failed to fetch meal!'});
    }
}

export const getOrderByUser = async (req, res) => {
    try{
        const orderByUser = await Order.findOrderByUser(req.body['user_id']);
        return res.status(200).json(orderByUser);
    }catch(error){
        return res.status(500).json({message: 'Failed to fetch user\'s orders'})
    }
}

export const createOrder = async (req, res) => {
    const {booking_id, opened_at, closed_at=null, status=null, note=null} = req.body;
    if(!booking_id || !opened_at) return res.status(400).json({message: 'All field are required!'});

    const newOrder = {booking_id, opened_at, closed_at, status, note};

    try {
        await Order.create(newOrder);
        return res.status(201).json({message: 'New order created successfully!'});
    }catch(error){
        return res.status(400).json({message: 'Failed to create new order!'});
    }
}

export const updateOrder = async (req, res) => {
    const{id} = req.params;
    const allowedFields = ['booking_time', 'end_time', 'special_request', 'table_id', 'user_id'];

    const unknownFields = Object.keys(req.body)
        .filter(field => !allowedFields.includes(field));
    
    if (unknownFields.length > 0) return res.status(500).json({message: 'Invalid fields'});

    try {
        await Order.update(req.body, id);
        return res.status(200).json({message: 'Updated successfully!'});
    } catch (error) {
        return req.status(500).json({message: 'Failed to update!'});
    }
}

export const deleteOrder = async (req, res) => {
    const {id} = req.params;
    const isExist = await Order.findOrderById(id);
    if (!isExist) return res.status(500).json({message: 'Cannot find order!'});

    try {
        await Order.delete(id);
        return res.status(200).json({message: 'Deleted successfully!'});
    } catch (error) {
        return res.status(500).json({message: 'Failed to delete!'});
    }
}
