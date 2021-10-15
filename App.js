const express = require('express');

const connectDB = require('./config/db');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

//middleware
var cors = require('cors');

//load out Passbook api file
const Transaction = require('./routes/api/Transaction');
const Signup = require('./routes/api/Signup')

// create app
const app = express();

//connet to database
connectDB();

//since mongoose promise is depreciated, we overide it with node's promise
mongoose.Promise = global.Promise;

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

// app.get('/',(req,res)=> res.send('MERN Stack'));

// only for budget api
app.use('/transaction', Transaction);
app.use('/signup', Signup);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use((err, req, res, next) => {
    console.log(err);
    next();
});

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    });
}

app.listen(port, () => console.log(`server is running ${port}`));