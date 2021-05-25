const express = require("express");
const router = express.Router();

// Importing all Controllers
const customersController = require("../controllers/customerController");

// ROUTES
router.get('/api', customersController.testCustomers);

// Getting all
router.get('/', customersController.getAllCustomers);

// Getting One
router.get('/:id', customersController.getCustomer, (req, res) => {
  res.json(res.customer);
});

// Creating one
router.post('/', customersController.addCustomer);

// Updating One
router.put('/:id', customersController.getCustomer, customersController.updateCustomer);

// Patch Customer
router.patch('/:id', customersController.getCustomer, customersController.patchCustomer);

// Deleting One
router.delete('/:id', customersController.getCustomer, customersController.deleteCustomer);

module.exports = router;
