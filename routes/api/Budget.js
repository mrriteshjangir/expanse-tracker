const express=require('express');

const router=express.Router();

//Load a model

const Budget=require('../../models/BudgetModel');

// Testing route
router.get('/test',(req,res)=>res.send('Budget testing done'));

//Create a budget object
router.post('/addBudget',(req,res)=>{
    Budget.create(req.body)
        .then(()=>res.status(200).json({msg:"Budget added successfully"}))
        .catch(err=>res.status(400).json({error:"Unable to add budget due to "+err}));
});

//Get list of budget
router.get('/getBudget',(req,res)=>{
    Budget.find()
        .then(budget=>res.status(200).json(budget))
        .catch(err=>res.status(400).json({error:"Unable to fetch budget due to "+err}));
});

// Get Eelement by id
router.get('/getBudget/:id',(req,res)=>{
    Budget.findById(req.params.id)
        .then(Budget=>res.status(200).json(Budget))
        .catch(err=>res.status(400).json({error:"Unable to fetch Budget due to "+err}));
});

// Update element usig id
router.put('/updateBudget/:id',(req,res)=>{
    Budget.findByIdAndUpdate(req.params.id,req.body)
        .then(()=>res.status(200).json({msg:"Budget updated successfully"}))
        .catch(err=>res.status(400).json({error:"Unable to update Budget due to "+err}));
});

//Delete element using id
router.delete('/deleteBudget/:id',(req,res)=>{
    Budget.findByIdAndRemove(req.params.id)
        .then(()=>res.status(200).json({msg:"Budget deleted successfully"}))
        .catch(err=>res.status(400).json({error:"Unable to delete Budget due to "+err}));
});


module.exports=router;