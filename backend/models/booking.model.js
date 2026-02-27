import db from '../config/db.js'

const TableBooking = {

    findBookingByUser: async (id) => {
        const bookings = await db.execute(
            `SELECT * FROM booking
            WHERE booking_id = ?`,
            [id]
        );
        return bookings;
    },

    create: async (booking) => {
        await db.execute(
            `INSERT INTO booking (quantity, booking_time, end_time, special_request, table_id, user_id)
            VALUE (?,?,?,?,?,?)`,
            [booking.quantity, booking.booking_time, booking.end_time, booking.special_request, table_id, user_id]
        );
    },

    update: async (updatedBooking, id) => {
        
        const keys = Object.keys(updatedBooking);
        const values = Object.values(updatedBooking);

        const setClause = keys.forEach(field => `${field}=?`).join(', ');

        await db.execute(
            `UPDATE booking
            SET ${setClause} WHERE meal_id=?`,
            [...values, id]
        );
    },

    read: async() => {
        const [row] = await db.execute(
            `SELECT * FROM booking`
        );
        return row;
    },

    delete: async (id) => {
        await db.execute(
            `DELETE FROM booking WHERE booking_id = ?`,
            [id]
        );
    },

}

export default TableBooking;