import db from '../config/db.js'

const Meal = {
    create: async (meal) => {
        await db.execute(
            `INSERT INTO meals (name, description, img, category, price)
            VALUE (?,?,?,?,?)`,
            [meal.name, meal.description, meal.img, meal.category, meal.price]
        );
    },

    update: async (updatedMeal, id) => {
        const fields = Object.keys(updatedMeal);
        const values = Object.values(updatedMeal);

        const setClause = fields.map(field => `${field}=?`).join(", ");

        await db.execute(
            `UPDATE meals
            SET ${setClause} WHERE meal_id=?`,
            [...values, id]
        );
    },

    read: async() => {
        const [row] = await db.execute(
            `SELECT * FROM meals` 
        );
        return row;
    },

    findById: async(id) => {
        const [row] = await db.execute(
            `SELECT * FROM meals
            WHERE meal_id=?`,
            [id]
        );
        return row[0];
    },

    delete: async (id) => {
        await db.execute(
            `DELETE FROM meals WHERE meal_id = ?`,
            [id]
        );
    },

}

export default Meal;