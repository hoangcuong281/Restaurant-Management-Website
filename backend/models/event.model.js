import db from '../config/db.js';

const Event = {
    create: async (event) => {
        db.execute(
            `INSERT INTO events VALUE (?,?,?,?);`, 
            [event.title, event.description, event.date, event.user_id]
        );
    },

    delete: async (event) => {
        db.execute(
            `DELETE FROM  events WHERE event_id = ?`,
            [event.event_id]
        );
    },

    update: async (updateEvent, id) => {

        db.execute(
            `UPDATE events
            SET ? WHERE id = ?`,
            [updateEvent, id]
        )
    },

    read: async () => {
        const [row] = await db.execute(
            `SELECT * FROM events`
        );
        return rows[0];
    },
}

export default Event;