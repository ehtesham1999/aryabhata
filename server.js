require('dotenv').config()

const express = require('express')
const app = express()
const cors = require("cors");
const mongoose = require('mongoose');
const { connect } = require('./routes/itemRoutes');


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
}

const connection = async () => {
    const url = 'mongodb+srv://admin_ehte:test@cluster0.tmjbb.mongodb.net/test?retryWrites=true&w=majority' ;
  
    try {
      await mongoose.connect(url, options);
      console.log("DB Connected Successfully");
    } catch (error) {
      console.log("DB Connection Failed");
    }
  };
// mongoose.connect('mongodb+srv://admin_ehte:test123@cluster0.tmjbb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true })
// const db = mongoose.connection
// db.on('error', (error) => console.error(error))
// db.once('open', () => console.log('Connected to Database'))

connection();
app.use(express.json());
app.use(cors());

app.get('/', function (req, res) {
  res.send('hello world')
})
// const itemRoutes = require("./routes/itemRoutes");
// //requests targeting all items - get, post, delete
// app.use("/items/", itemRoutes);

app.listen(process.env.PORT || 5000, () => console.log('Server Started'))
