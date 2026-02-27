import db from '../config/db.js';

const Event = {

    findById: async (id) => {
        const [row] = await db.execute(
            `SELECT * FROM events WHERE event_id=?`,
            [id]
        );
        return row[0];
    },

    create: async (event) => {
        await db.execute(
            `INSERT INTO events (title, description, date, user_id)
            VALUE (?,?,?,?);`,
            [event.title, event.description, event.date, event.user_id]
        );
    },

    delete: async (id) => {
        await db.execute(
            `DELETE FROM events WHERE event_id = ?`,
            [id]
        );
    },

    update: async (updateEvent, id) => {

        const fields = Object.keys(updateEvent);
        const values = Object.values(updateEvent);

        const setClause = fields.map(field => `${field}=?`).join(', ');
        
        await db.execute(
            `UPDATE events
            SET ${setClause} WHERE event_id = ?`,
            [...values, id]
        )
    },

    read: async () => {
        const [row] = await db.execute(
            `SELECT * FROM events`
        );
        return row;
    },
}

export default Event;