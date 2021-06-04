const mongoose = require("mongoose");
const customer_detailsSchema = new mongoose.Schema({
  name:String,
  id:String
})
const invoiceSchema = new mongoose.Schema({
    "customer_details": {
      "type":customer_detailsSchema
    },
    "invoice_number": {
      "type": "String"
    },
    "order_number": {
      "type": "String"
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
    "invoice_amount":{
      "type":"Number"
    },
    "items": {
      "type": [
        "Mixed"
      ]
    },
    "total":{
      "type":"Number"
    }
    
  });

let invoiceModel = mongoose.model("invoice", invoiceSchema);
module.exports = invoiceModel