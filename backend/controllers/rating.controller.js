import Rating from '../models/rating.model.js';

export const createRating = async (req, res) => {
    const { star, comment=null, booking_id } = req.body;
    const user_id = req.user.user_id;
    const email = req.user.email;
    if (!email || !star || !booking_id) return res.status(400).json({message: 'All fields are required!'});

    try {
        await Rating.create(email, star, comment, user_id, booking_id);
        res.status(201).json({ message: 'Rating created successfully!' });
    } catch (error) {
        console.error('Error creating rating:', error);
        res.status(500).json({ message: 'Error creating rating.' });
    }
}

export const getRatings = async (req, res) => {
    try {
        const ratings = await Rating.read();
        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching ratings', error: error.message });
    }
}

export const deleteRating = async (req, res) => {
    const { id } = req.params;
    try {
        await Rating.delete(id);
        res.status(200).json({ message: 'Rating deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting rating', error: error.message });
    }
}