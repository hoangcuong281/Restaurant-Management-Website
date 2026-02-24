import db from '../config/db.js';
import bcrypt from 'bcryptjs';

const User = {

    findByEmail: async (email) => {
        const [rows] = await db.execute(
            `SELECT * FROM users WHERE email = ?`,
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
    },

    authenticate: async (user,pwd) => {
        if (!user) return 0;

        const isMatch = await bcrypt.compare(pwd, user.password_hash);
        if (isMatch) return 1;
        return 0;
    }
}

export default User;