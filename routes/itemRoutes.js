const express = require("express");
const router = express.Router();

// Importing all Controllers
const itemsController = require("../controllers/itemController");

// ROUTES
//to test the connection
router.get('/api', itemsController.testItems);

// Getting all
router.get('/', itemsController.getAllItems);

// Getting One
router.get('/:id', itemsController.getItem, (req, res) => {
  res.json(res.item);
});

// Creating one
router.post('/', itemsController.addItem);

// Updating One
router.put('/:id', itemsController.getItem, itemsController.updateItem);

// Patch Item
router.patch('/:id', itemsController.getItem, itemsController.patchItem);

// Deleting One
router.delete('/:id', itemsController.getItem, itemsController.deleteItem);

module.exports = router;
