import db from '../config/db.js'

const Meal = {
    create: async (meal) => {
        db.execute(
            `INSERT INTO meals (name, description, img, category, price)
            VALUE ?,?,?,?,?`,
            [meal.name, meal.description, meal.img, meal.category, meal.price]
        );
    },

    update: async (updatedMeal, id) => {
        db.execute(
            `UPDATE meals
            SET ? WHERE meal_id=?`,
            [updatedMeal, id]
        );
    },

    read: async() => {
        const [row] = await db.execute(
            `SELECT * FROM meals`
        );
        return row[0];
    },

    delete: async (meal) => {
        db.execute(
            `DELETE FROM meals WHERE meal_id = ?`,
            [meal.meal_id]
        );
    },

}

export default Meal;