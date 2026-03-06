import db from "../config/db.js";

const BookingTable = {
    create: async (booking_id, table_id) => {
        await db.execute(
            `INSERT INTO booking_tables
            VALUE (?, ?)`,
            [booking_id, table_id]
        );
    },
    update: async (booking_id, table_id, upd_table) => {
        await db.execute(
            `UPDATE booking_tables
            SET table_id = ?
            WHERE booking_id = ?, table_id = ?`,
            [upd_table, booking_id, table_id]
        );
    },
    
    findById: async (booking_id) => {
        const [row] = await db.execute(
            `SELECT * FROM booking_tables
            WHERE booking_id = ?`,
            [booking_id]
        );
        return row;
    },

    delete: async (booking_id, table_id) => {
        await db.execute(
            `DELETE FROM booking_tables
            WHERE booking_id=? AND table_id=?`,
            [booking_id, table_id]
        )
    } 
}

export default BookingTable;