require('dotenv').config()

const express = require('express')
const app = express()
const path = require('path')
const cors = require("cors");
const mongoose = require('mongoose');
const { connect } = require('./routes/itemRoutes');

//frf
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

connection();

app.use(express.json());
app.use(cors());
// process.env.PWD = process.cwd();
// app.get('/', function (req, res) {
//   res.send(process.env.PWD)
// })
const itemRoutes = require("./routes/itemRoutes");
//requests targeting all items - get, post, delete
app.use("/items/", itemRoutes);


app.use(express.static(path.join(__dirname, '/client/build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build'))
})


app.listen(process.env.PORT || 5000, () => console.log('Server Started'))
