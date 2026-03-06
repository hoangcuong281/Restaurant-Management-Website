import BookingTable from '../models/booking_tables.model.js';
import Booking from '../models/booking.model.js';
import RestaurantTable from '../models/restaurant_table.model.js';

export const createBookingTable = async (req, res) => {
    const {booking_id, table_id} = req.body;

    const isBookingExist = await Booking.findById(booking_id);
    const isTableExist = await RestaurantTable.findById(table_id);

    if (!isBookingExist || !isTableExist) return res.status(400).json({message: 'Failed to find table or booking order'});


    const newBookingTable = {booking_id, table_id};
    
    try {
        await BookingTable.create(newBookingTable);
        return res.status(201).json({message: 'Created new booking table successfully'});
    } catch (error) {
        return res.status(500).json({message: 'Failed to add new booking table'});
    }
}

export const getBookingTable = async (req, res) => {
    const {booking_id} = req.params;
    const isBookingExist = await Booking.findById(booking_id);
    if(!isBookingExist) return res.status(500).json({message: 'Cannot find booking'});

    try {
        const tables = await BookingTable.findById(booking_id);
        return res.status(200).json(tables);
    } catch (error) {
        return res.status(500).json({message: 'Failed to fetch booking tables'});
    }
    
}

export const updateBookingTable = async (req, res) => {
    const {booking_id, table_id, upd_table} = req.body;

    const isBookingExist = await Booking.findById(booking_id);
    const isTableExist = await RestaurantTable.findById(table_id);

    if (!isBookingExist || !isTableExist) return res.status(400).json({message: 'Failed to find table or booking order'});

    try {
        await BookingTable.update(booking_id, table_id, upd_table);
        return res.status(200).json({message: 'Updated successfully'});
    } catch (error) {
        return res.status(500).json({message: 'Cannot update booking table'})
    }
}

export const deleteBookingTable = async (req, res) => {
    const {booking_id , table_id} = req.params;

    try {
        await BookingTable.delete(booking_id, table_id);
        return res.status(200).json({message: 'Deleted successfully'})
    } catch (error) {
        return res.status(500).json({message: 'Faield to delete!'})
        
    }
}