//Import the library into your project
var easyinvoice = require('easyinvoice');
var fs = require('fs');
const InvoiceModel = require("../models/invoiceModel");
 

var data = {
    //"documentTitle": "RECEIPT", //Defaults to INVOICE
    "currency": "INR",
    "taxNotation": "vat", //or gst
    "marginTop": 25,
    "marginRight": 25,
    "marginLeft": 25,
    "marginBottom": 25,
    "logo": "https://www.graphicdesignforum.com/uploads/default/86fd6dc9263ee22d2fac7cc0fa37ab2f34894bc0", //or base64
    //"logoExtension": "png", //only when logo is base64
    "sender": {
        "company": "Sample Corp",
        "address": "Sample Street 123",
        "zip": "1234 AB",
        "city": "Sampletown",
        "country": "Samplecountry"
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
    },
    "client": {
        "company": "Client Corp",
        "address": "Clientstreet 456",
        "zip": "4567 CD",
        "city": "Clientcity",
        "country": "Clientcountry"
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
    },
    "invoiceNumber": "2020.0001",
    "invoiceDate": "05-01-2020",
    "products": [
        {
            "quantity": "2",
            "description": "Test1",
            "tax": 6,
            "price": 33.87
        },
        {
            "quantity": "4",
            "description": "Test2",
            "tax": 21,
            "price": 10.45
        }
    ],
    "bottomNotice": "Kindly pay your invoice within 15 days."
};
 
//Create your invoice! Easy!
// const getInvoice = easyinvoice.createInvoice(data, async function (result) {
//     //The response will contain a base64 encoded PDF file
//     // const data = {};
//     // const result = await easyinvoice.createInvoice(data);                       
//     await fs.writeFileSync("invoice.pdf", result.pdf, 'base64');
//     // console.log(result.pdf);
// });

   

module.exports = {
    getInvoice :  async (req, res) => {
        try {
            const result = await easyinvoice.createInvoice(data);
            res.status(201).json(result);
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
    },

    addInvoice : async (req,res) =>{
        try{
            const newInvoice = new InvoiceModel(req.body);
            const savedInvoice = await newInvoice.save();
            res.status(201).json(savedInvoice);
        }
        catch(err){
            res.status(400).json({ message: err.message });
        }

    },
    getAllInvoices : async (req, res) => {
    try {
      const invoices = await InvoiceModel.find();
      console.log(invoices);
      res.status(201).json(invoices);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  };

