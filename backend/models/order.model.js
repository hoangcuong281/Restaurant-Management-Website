import db from '../config/db.js'

const Order = {

    findOrderById: async (id) => {
        const [row] = await db.execute(
            `SELECT * FROM orders
            WHERE id=?`,
            [id]
        );
        return row[0];
    },


    findOrderByUser: async (user_id) => {
        const [row] = await db.execute(
            `SELECT * FROM orders
            WHERE user_id=?`,
            [user_id]
        );
        return row;
    },

    create: async (order, booking_id) => {
        await db.execute(
            `INSERT INTO orders (booking_id, opened_at, closed_at, status, note)
            VALUE ?,?,?,?,?`,
            [booking_id, order.opened_at, order.closed_at, order.status, order.note]
        );
    },

    update: async (updatedorder, id) => {
        const keys = Object.keys(updatedorder);
        const values = Object.values(updatedorder);

        const setClause = keys.forEach(field => `${field}=?`).join(', ');

        await db.execute(
            `UPDATE orders
            SET ${setClause} WHERE order_id=?`,
            [...values, id]
        );
    },

    read: async() => {
        const [row] = await db.execute(
            `SELECT * FROM orders`
        );
        return row;
    },

    delete: async (order) => {
        db.execute(
            `DELETE FROM orders WHERE order_id = ?`,
            [order.order_id]
        );
    },

}

export default Order;