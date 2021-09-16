const express=require('express');

const router=express.Router();

//Load a model

const Expanse=require('../../models/ExpanseModel');

// Testing route
router.get('/test1',(req,res)=>res.send('Expanse testing done'));

//Create a budget object
router.post('/addExpanse',(req,res)=>{
    Expanse.create(req.body)
        .then(()=>res.status(200).json({msg:"Expanse added successfully"}))
        .catch(err=>res.status(400).json({error:"Unable to add Expanse due to "+err}));
});

//Get list of budget
router.get('/getExpanse',(req,res)=>{
    Expanse.find()
        .then(Expanse=>res.status(200).json(Expanse))
        .catch(err=>res.status(400).json({error:"Unable to fetch Expanse due to "+err}));
});

// Get Eelement by id
router.get('/getExpanse/:id',(req,res)=>{
    Expanse.findById(req.params.id)
        .then(Expanse=>res.status(200).json(Expanse))
        .catch(err=>res.status(400).json({error:"Unable to fetch Expanse due to "+err}));
});

// Update element usig id
router.put('/updateExpanse/:id',(req,res)=>{
    Expanse.findByIdAndUpdate(req.params.id,req.body)
        .then(()=>res.status(200).json({msg:"Expanse updated successfully"}))
        .catch(err=>res.status(400).json({error:"Unable to update Expanse due to "+err}));
});

//Delete element using id
router.delete('/deleteExpanse/:id',(req,res)=>{
    Expanse.findByIdAndRemove(req.params.id)
        .then(()=>res.status(200).json({msg:"Expanse deleted successfully"}))
        .catch(err=>res.status(400).json({error:"Unable to delete Expanse due to "+err}));
});
module.exports=router;