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

    searchByName: async (q, limit = 20) => {
        if (!q || !q.trim()) return [];

        const like = `%${q.trim()}%`;
        const safeLimit = Number(limit) || 20;
        const [rows] = await db.execute(
            `SELECT user_id AS _id, name, email, phone 
            FROM users 
            WHERE name LIKE ? 
            LIMIT ${limit}`,
            [like]
        );

        return rows;
    },

    authenticate: async (user,pwd) => {
        if (!user) return 0;

        const isMatch = await bcrypt.compare(pwd, user.password_hash);
        if (isMatch) return 1;
        return 0;
    }
}

export default User;