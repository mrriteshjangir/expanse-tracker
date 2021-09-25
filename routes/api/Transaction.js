const express=require('express');

const router=express.Router();

//Load a model

const Transaction=require('../../models/TransactionModel');

//Create a Transaction object
router.post('/addTransaction',(req,res)=>{
    Transaction.create(req.body)
        .then(()=>res.status(200).json({msg:"Transaction added successfully"}))
        .catch(err=>res.status(400).json({error:"Unable to add Transaction due to "+err}));
});

//Get list of Transaction
router.get('/getTransaction',(req,res)=>{
    Transaction.find()
        .then(Transaction=>res.status(200).json(Transaction))
        .catch(err=>res.status(400).json({error:"Unable to fetch Transaction due to "+err}));
});

// Get Eelement by id
router.get('/getTransaction/:id',(req,res)=>{
    Transaction.findById(req.params.id)
        .then(Transaction=>res.status(200).json(Transaction))
        .catch(err=>res.status(400).json({error:"Unable to fetch Transaction due to "+err}));
});

// Update element usig id
router.put('/updateTransaction/:id',(req,res)=>{
    Transaction.findByIdAndUpdate(req.params.id,req.body)
        .then(()=>res.status(200).json({msg:"Transaction updated successfully"}))
        .catch(err=>res.status(400).json({error:"Unable to update Transaction due to "+err}));
});

//Delete element using id
router.delete('/deleteTransaction/:id',(req,res)=>{
    Transaction.findByIdAndRemove(req.params.id)
        .then(()=>res.status(200).json({msg:"Transaction deleted successfully"}))
        .catch(err=>res.status(400).json({error:"Unable to delete Transaction due to "+err}));
});


module.exports=router;