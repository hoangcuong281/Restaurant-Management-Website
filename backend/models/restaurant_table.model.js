import db from '../config/db.js';

const RestaurantTable = {
    create: async (table) => {
        db.execute(
            `INSERT INTO restaurant_tables (quantity, location, table_number, status)
            VALUE (?,?,?,?)`,
            [table.quantity, table.location, table.table_number, table.status]
        )
    },
    
    update: async (updatedTable, id) => {
        db.execute(
            `UPDATE restaurant_tables
            SET ? WHERE table_id=?`,
            [updatedTable, id]
        );
    },

    read: async() => {
        const [row] = await db.execute(
            `SELECT * FROM restaurant_tables`
        );
        return row[0];
    },

    delete: async (table) => {
        db.execute(
            `DELETE FROM restaurant_tables WHERE table_id = ?`,
            [table.table_id]
        );
    },

}