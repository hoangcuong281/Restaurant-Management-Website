import db from '../config/db.js';

const RestaurantTable = {
    create: async (quantity, location, table_number, status) => {
        db.execute(
            `INSERT INTO restaurant_tables (quantity, location, table_number)
            VALUE (?,?,?)`,
            [quantity, location, table_number]
        )
    },
    
    update: async (updatedTable, id) => {
        const fields = Object.keys(updatedTable);
        const values = Object.values(updatedTable);

        const setClause = fields.map(field => `${field}=?`).join(", ");


        db.execute(
            `UPDATE restaurant_tables
            SET ${setClause} WHERE table_id=?`,
            [...values, id]
        );
    },

    read: async() => {
        const [row] = await db.execute(
            `SELECT * FROM restaurant_tables`
        );
        return row[0];
    },

    delete: async (table_id) => {
        db.execute(
            `DELETE FROM restaurant_tables WHERE table_id = ?`,
            [table_id]
        );
    },

}

export default RestaurantTable;