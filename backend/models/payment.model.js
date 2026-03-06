import db from '../config/db.js'

const Payment = {
    create: async (payment) => {
        db.execute(
            `INSERT INTO payments (order_id, amount, method, status, paid_at)
            VALUES (?,?,?,?,?)`,
            [payment.order_id, payment.amount, payment.method, payment.status, payment.paid_at]
        );
    },

    read: async() => {
        const [row] = await db.execute(
            `SELECT * FROM payments`
        );
        return row;
    },

    update: async (payment, payment_id) => {
        try {
            await db.execute(
                `SELECT * FROM payments WHERE payment_id=?`,
                [payment_id]
            );
        } catch (error) {
            
        }
        const fields = Object.keys(payment);
        const values = Object.values(payment);
        console.log(payment);
        const setClause = fields.map(field => `${field}=?`).join(", ");
        await db.execute(
            `UPDATE payments SET ${setClause} WHERE payment_id=?`,
            [...values, payment_id]
        );
    }
}

export default Payment;