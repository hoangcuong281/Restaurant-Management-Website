import User from '../models/user.model.js';

const search_users = async (req, res) => {
    try {
        const q = req.query.q || req.query.search || '';
        if (!q || q.trim() === '') return res.json([]);
        const users = await User.searchByName(q.trim());
        res.json(users);
    } catch (err) {
        console.error('search_users error', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export { search_users };
