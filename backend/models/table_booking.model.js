import db from '../config/db.js'

const TableBooking = {
    create: async (booking) => {
        db.execute(
            `INSERT INTO table_booking (quantity, booking_time, end_time, special_request, table_id, user_id)
            VALUE ?,?,?,?,?,?`,
            [booking.quantity, booking.booking_time, booking.end_time, booking.special_request, table_id, user_id]
        );
    },

    update: async (updatedBooking, id) => {
        db.execute(
            `UPDATE table_booking
            SET ? WHERE meal_id=?`,
            [updatedBooking, id]
        );
    },

    read: async() => {
        const [row] = await db.execute(
            `SELECT * FROM table_booking`
        );
        return row[0];
    },

    delete: async (booking) => {
        db.execute(
            `DELETE FROM table_booking WHERE booking_id = ?`,
            [booking.booking_id]
        );
    },

}

export default TableBooking;