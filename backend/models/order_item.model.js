import db from '../config/db.js'

const OrderItem = {

    findByOrder: async (order_id) => {
        const [row] = await db.execute(
            `SELECT * FROM order_items
            WHERE order_id=?`,
            [order_id]
        );
        return row;
    },

    create: async (meal_id, order_id, quantity, note) => {
        try {
            const price_at_time = await db.execute(
                `SELECT price FROM meals WHERE meal_id=?`,
                [meal_id]
            );
            db.execute(
                `INSERT INTO order_items (order_id, meal_id, quantity, price_at_time, note)
                VALUES (?,?,?,?,?)`,
                [order_id, meal_id, quantity, price_at_time[0][0].price, note]
            );
        } catch (error) {
            console.error("Error occurred while fetching meal price:", error);
        }
    },

    update: async (updatedOrderItem, order_id, meal_id) => {
        const keys = Object.keys(updatedOrderItem);
        const values = Object.values(updatedOrderItem);
        const setClause = keys.map(field => `${field}=?`).join(', ');

        db.execute(
            `UPDATE order_items
            SET ${setClause} WHERE order_id=? AND meal_id=?`,
            [...values, order_id, meal_id]
        );
    },

    read: async() => {
        const [row] = await db.execute(
            `SELECT * FROM order_items`
        );
        return row;
    },

    delete: async (meal_id, order_id) => {
        db.execute(
            `DELETE FROM order_items WHERE meal_id = ? AND order_id = ?`,
            [meal_id, order_id]
        );
    },

}

export default OrderItem;