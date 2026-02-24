import db from '../config/db.js'

const OrderItem = {
    create: async (order_item, meal_id, order_id) => {
        db.execute(
            `INSERT INTO order_items (order_id, meal_id, quantity, price_at_time, note)
            VALUE ?,?,?,?,?`,
            [order_id, meal_id, order_item.quantity, order_item.price_at_time, order_item.note]
        );
    },

    update: async (updatedOrderItem, id) => {
        db.execute(
            `UPDATE order_items
            SET ? WHERE order_item_id=?`,
            [updatedOrderItem, id]
        );
    },

    read: async() => {
        const [row] = await db.execute(
            `SELECT * FROM order_items`
        );
        return row[0];
    },

    delete: async (order_item) => {
        db.execute(
            `DELETE FROM order_items WHERE order_item_id = ?`,
            [order_item.order_item_id]
        );
    },

}

export default OrderItem;