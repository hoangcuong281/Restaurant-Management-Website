import Meal from "../models/meal.model.js";

export const getMenu = async (req, res) => {
    try {
        const meals = await Meal.read();
        res.status(200).json(meals);
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch meals'});
    }
}

export const getMealById = async (req, res) => {
    const {id} = req.params;
    try {
        const meal = await Meal.findById(id);
        res.status(200).json(meal);
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch meal'});
    }
}

export const createMeal = async (req, res) => {
    const {name, description=null, img=null, category, price} = req.body;
    if(!name || !category || !price) {
        return res.status(400).json({message: 'All fields are required'});
    }
    const meal = {name, description, img, category, price};
    try {
        await Meal.create(meal);
        res.status(201).json(meal);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Validation Error',
                details: error.message
            });
        }
        if (error.code === 11000) {
            return res.status(409).json({
                message: 'A meal with this name already exists'
            });
        }
        res.status(500).json({
            message: 'Failed to create meal',
            details: error.message
        });
    }
}

export const updateMeal = async (req, res) => {
    const {id} = req.params;
    const allowedFields = ['name', 'description', 'img', 'category', 'highlight', 'price'];
    
    const exist = await Meal.findById(id);
    if (!exist) return res.status(400).json({message: 'Meal not found!'});

    const unknownFields = Object.keys(req.body)
        .filter(field => !allowedFields.includes(field));
    if (unknownFields.length > 0) {
        return res.status(400).json({
            message: `Invalid fields detected: ${unknownFields.join(', ')}`,
            allowedFields
        });
    }
    
    const updateData = {};
    
    allowedFields.forEach(field => {
        if (req.body[field] !== undefined){
            updateData[field] = req.body[field]
        }
    })

    try {
        await Meal.update(
            updateData,
            id
        );

        res.status(200).json({
            message: 'Updated successfully'
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                message: 'Invalid meal ID format',
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
            message: 'Failed to update meal',
            details: error.message
        });
    }
}

export const deleteMeal = async (req, res) => {
    const {id} = req.params;    
    try {
        await Meal.delete(id);
        res.status(200).json({message: 'Deleted successfully'});
    } catch (error) {
        res.status(500).json({message: 'Product not found'});
    }
}
