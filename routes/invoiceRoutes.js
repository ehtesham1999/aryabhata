const express = require("express");
const router = express.Router();

// Importing all Controllers
const invoiceController = require("../controllers/invoiceController");


// Getting invoice as pdf
router.get('/pdf', invoiceController.getInvoice);

// Getting all invoice
router.get('/', invoiceController.getAllInvoices);


// Creating one
router.post('/', invoiceController.addInvoice);


module.exports = router;
