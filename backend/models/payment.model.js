import db from '../config/db.js'

const Payment = {
    create: async (payment, order_id) => {
        db.execute(
            `INSERT INTO meals (order_id, amount, method, status, paid_at)
            VALUE ?,?,?,?,?`,
            [order_id, payment.amount, payment.method, payment.status, payment.paid_at]
        );
    },

    read: async() => {
        const [row] = await db.execute(
            `SELECT * FROM meals`
        );
        return row[0];
    },

}

export default Payment;