import db from '../config/db.js'

const Rating = {
    create: async (rating, user_id, booking_id) => {
        db.execute(
            `INSERT INTO ratings VALUE ?,?,?,?,?`,
            [rating.email, rating.star, rating.comment, user_id, booking_id]
        );
    },

    read: async() => {
        const [row] = await db.execute(
            `SELECT * FROM ratings`
        );
        return row[0];
    },

    delete: async (rating) => {
        db.execute(
            `DELETE FROM ratings WHERE rating_id = ?`,
            [rating.rating_id]
        );
    },


}

export default Rating;