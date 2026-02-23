import db from '../config/db.js'

const User = {

    findByEmail: async (email) => {
        const [rows] = await db.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        return rows[0];
    },

    findById: async (id) => {
        const [rows] = await db.execute(
            'SELECT * FROM users WHERE user_id = ?',
            [id]
        );
        return rows[0];
    },

    create: async (user) => {
        const [result] = await db.execute(
            `INSERT INTO users (name, email, password_hash, role, phone) 
            VALUE (?,?,?,?,?)`,
            [user.name, user.email, user.password_hash, user.role, user.phone]
        );
    }
}

export default User;