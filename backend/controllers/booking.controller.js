import TableBooking from '../models/booking.model.js'

export const getAllBooking = async (req, res) => {
    try{
        const bookings = await TableBooking.read();
        return res.status(200).json(bookings);
    } catch (error) {
        return res.status(500).json({message: 'Failed to fetch bookings!'});
    }
}

export const getBookingByUser = async (req, res) => {
    const { id } = req.params;
    try{
        const booking = await TableBooking.findBookingByUser(id);
        return res.status(200).json(booking);
    } catch (error) {
        return res.status(500).json({message: 'Failed to fetch booking!'});
    }
}

export const createBooking = async (req, res) => {
    const { quantity, booking_time, end_time, special_request = null, table_id, user_id } = req.body;
    if (quantity == null || !booking_time || !end_time || !table_id || !user_id) {
        return res.status(400).json({message: 'Required fields are missing!'});
    }

    const newBooking = { quantity, booking_time, end_time, special_request, table_id, user_id };

    try {
        await TableBooking.create(newBooking);
        return res.status(201).json({message: 'New booking created successfully!'});
    } catch (error) {
        return res.status(400).json({message: 'Failed to create new booking!'});
    }
}

export const updateBooking = async (req, res) => {
    const { id } = req.params;
    const allowedFields = ['quantity', 'booking_time', 'end_time', 'special_request', 'table_id', 'user_id'];

    const unknownFields = Object.keys(req.body).filter(field => !allowedFields.includes(field));
    if (unknownFields.length > 0) return res.status(400).json({message: 'Invalid fields'});

    try {
        await TableBooking.update(req.body, id);
        return res.status(200).json({message: 'Updated successfully!'});
    } catch (error) {
        return res.status(500).json({message: 'Failed to update!'});
    }
}

export const deleteBooking = async (req, res) => {
    const { id } = req.params;
    try {
        const isExist = await TableBooking.findBookingByUser(id);
        if (!isExist || (Array.isArray(isExist) && isExist.length === 0)) return res.status(404).json({message: 'Cannot find booking!'});

        await TableBooking.delete(id);
        return res.status(200).json({message: 'Deleted successfully!'});
    } catch (error) {
        return res.status(500).json({message: 'Failed to delete!'});
    }
}
