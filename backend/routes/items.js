const express = require('express');

const router = express.Router();

const { getItems, deleteItem, updateItem, addItem } = require('../middleware/items')

router.get('/', getItems)
router.post('/', addItem)
router.delete('/:id', deleteItem)
router.put('/:id', updateItem)


module.exports = router;