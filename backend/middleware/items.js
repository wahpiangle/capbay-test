const Item = require("../model/itemModel");

const addItem = async (req, res, next) => {
    const { name, color } = req.body;
    try {
        const item = new Item({ name, color });
        await item.save();
        res.status(201).json({ item });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getItems = async (req, res, next) => {
    try {
        const items = await Item.find();
        res.status(200).json({ items });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteItem = async (req, res, next) => {
    try {
        const id = req.params.id;
        const item = await Item.findByIdAndDelete(id);
        if(!item){
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Item deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const updateItem = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { name, color } = req.body;
        await Item.findByIdAndUpdate(id, { name, color });
        res.status(200).json({ message: 'Item updated' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { getItems, deleteItem, addItem, updateItem };