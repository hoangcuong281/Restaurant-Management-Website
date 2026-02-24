import db from '../config/db.js'

const Order = {
    create: async (order, booking_id) => {
        db.execute(
            `INSERT INTO orders (booking_id, opened_at, closed_at, status, note)
            VALUE ?,?,?,?,?`,
            [booking_id, order.opened_at, order.closed_at, order.status, order.note]
        );
    },

    update: async (updatedorder, id) => {
        db.execute(
            `UPDATE orders
            SET ? WHERE order_id=?`,
            [updatedorder, id]
        );
    },

    read: async() => {
        const [row] = await db.execute(
            `SELECT * FROM orders`
        );
        return row[0];
    },

    delete: async (order) => {
        db.execute(
            `DELETE FROM orders WHERE order_id = ?`,
            [order.order_id]
        );
    },

}

export default Order;