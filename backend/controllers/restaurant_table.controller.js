import e from "express";
import RestaurantTable from "../models/restaurant_table.model.js";

export const createTable = async (req, res) => {
    const { quantity, location, table_number } = req.body;
    try {
        await RestaurantTable.create(quantity, location, table_number);
        res.status(201).json({ message: 'Table created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating table', error: error.message });
    }
};

export const updateTable = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedTable = req.body;
        await RestaurantTable.update(updatedTable, id);
        res.status(200).json({ message: 'Table updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating table', error: error.message });
    }
};

export const readTable = async (req, res) => {
    try {
        const tables = await RestaurantTable.read();
        res.status(200).json(tables);
    } catch (error) {
        res.status(500).json({ message: 'Error reading tables', error: error.message });
    }
};

export const deleteTable = async (req, res) => {
    try {        
        const id = req.params.id;
        await RestaurantTable.delete(id);
        res.status(200).json({ message: 'Table deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting table', error: error.message });
    }
};

