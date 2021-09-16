const express=require('express');

const connectDB=require('./config/db');

//middleware
var cors=require('cors');

//load out budget api file
const budget=require('./routes/api/Budget');
const expanse=require('./routes/api/Expanse')

// create app
const app=express();

//connet to database
connectDB();

app.use(cors({origin:true,credentials:true}));

app.use(express.json({extended:false}));

// app.get('/',(req,res)=> res.send('MERN Stack'));

// only for budget api
app.use('/budget',budget);
app.use('/expanse',expanse);
const port = 5000;

app.listen(port,()=>console.log(`server is running ${port}`));