const express = require('express');
const router = express.Router();
const Signup = require('../../models/SignupModel');

// Only for file upload -start

const multer=require('multer');

const {v4:uuidv4}=require('uuid');

let path=require('path');

const storage=multer.diskStorage({

    destination:function(req,file,cb)
    {
        cb(null,'client/public/images');
    },
    filename:function(req,file,cb){
        cb(null,uuidv4()+'-'+Date.now()+path.extname(file.originalname));
    }
    
});

let upload =multer({storage});

// Only for file upload -End

router.route('/create').post(upload.single('photo'),(req,res) =>{

    const {name,email,password}=req.body;

    const photo=req.file.filename;

    const pckgData={
        name,
        email,
        password,
        photo
    }

    const pckg = new Signup(pckgData);

    pckg.save()
        .then(()=>res.status(200).json({msg:'Your Created Successfully'}))
        .catch((err)=>res.status(400).json({err:'Error is '+err}))

});

// Verify user 

router.get("/verify/:email",(req,res)=>{
    Signup.findOne(req.body.email)
    .then(data=>res.json(data))
    .catch(err=>res.status(404).json({err:"Data not found"}))
});
module.exports=router;