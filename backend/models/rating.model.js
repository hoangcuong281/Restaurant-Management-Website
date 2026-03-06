import db from '../config/db.js'

const Rating = {
    create: async (email, star, comment, user_id, booking_id) => {
        db.execute(
            `INSERT INTO ratings (email, star, comment, user_id, booking_id)
            VALUES (?,?,?,?,?)`,
            [email, star, comment, user_id, booking_id]
        );
    },

    read: async() => {
        const [row] = await db.execute(
            `SELECT * FROM ratings`
        );
        return row[0];
    },

    delete: async (booking_id) => {
        db.execute(
            `DELETE FROM ratings WHERE booking_id = ?`,
            [booking_id]
        );
    },


}

export default Rating;