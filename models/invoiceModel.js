const mongoose = require("mongoose");
const invoiceSchema = new mongoose.Schema({
    "customer_name": {
      "type": "String"
    },
    "invoice_number": {
      "type": "Date"
    },
    "order_number": {
      "type": "Date"
    },
    "invoice_date": {
      "type": "Date"
    },
    "invoice_terms": {
      "type": "String"
    },
    "invoice_due_date": {
      "type": "Date"
    },
    "items": {
      "type": [
        "Mixed"
      ]
    },
    "customer_id": {
      "type": "ObjectId"
    }
  });

let invoiceModel = mongoose.model("invoice", invoiceSchema);
module.exports = invoiceModel