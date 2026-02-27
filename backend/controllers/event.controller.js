import Event from '../models/event.model.js';

export const createEvent = async (req, res) => {
    try {
        const { title, description=null, date, user_id=req.user.user_id } = req.body;
        if (!title || !date) return res.status(400).json({message: 'All fields are required!'});
        const newEvent = { title, description, date, user_id};
        await Event.create(newEvent);
        console.log(newEvent);
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: 'Error creating event', error: error.message });
    }
}

export const getEvents = async (req, res) => {
    try {
        const events = await Event.read();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error: error.message });
    }
}

export const updateEvent = async (req, res) => {
    const { id } = req.params;
    const allowedFields = ['title', 'description', 'date'];

    const isExist = Event.findById(id);
    if (!isExist) return res.status(400).json({message: 'Cannot find event!'});

    const unknownFields = Object.keys(req.body)
        .filter(field => !allowedFields.includes(field));
    if (unknownFields.length > 0) return res.status(400).json({message: 'Invalid fields detected'});
    
    const updEvent = {};

    allowedFields.forEach(field => {
        if (req.body[field] !== undefined)
            updEvent[field] = req.body[field];
    });
    try {
        Event.update(updEvent, id);
        res.status(200).json({
            message: 'Updated successfully!'
        })
    }catch(error){
        if (error.name === 'CastError') {
            return res.status(400).json({
                message: 'Invalid event ID format',
                details: error.message
            });
        }
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Validation Error', 
                details: error.message
            });
        }
        res.status(500).json({
            message: 'Failed to update event',
            details: error.message
        });
    }
}

export const deleteEvent = async (req, res) => {
    const { id } = req.params;
    const isExist = await Event.findById(id);
    if (!isExist) return res.status(400).json({message: 'Cannot find event!'});
    try {
        await Event.delete(id);
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting event', error: error.message });
    }
}