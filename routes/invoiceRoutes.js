const express = require("express");
const router = express.Router();

// Importing all Controllers
const invoiceController = require("../controllers/invoiceController");


// Getting all
router.get('/', invoiceController.getInvoice);


// Creating one
// router.post('/', invoiceController.addCustomer);


module.exports = router;
