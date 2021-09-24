const express=require('express');

const connectDB=require('./config/db');

//middleware
var cors=require('cors');

//load out Passbook api file
const Transaction=require('./routes/api/Transaction');
const Signup=require('./routes/api/Signup')

// create app
const app=express();

//connet to database
connectDB();

app.use(cors({origin:true,credentials:true}));

app.use(express.json({extended:false}));

// app.get('/',(req,res)=> res.send('MERN Stack'));

// only for budget api
app.use('/transaction',Transaction);
app.use('/signup',Signup);
const port = 5000;

app.listen(port,()=>console.log(`server is running ${port}`));