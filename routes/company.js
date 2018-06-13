const express = require('express');
const router = express.Router();
const Product = require("../model/ProductType");
const Company = require("../model/Company");
const mongoose = require('mongoose');
const checkAuth = require("../middleware/check-Auth");



router.get("/",(req,res,next) =>{
    Company.find()
        .select('name products netIncome _id location')
        .exec()
        .then(result =>{
            res.status(200).json(result);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
});

router.post("/",checkAuth,(req,res,next)=>{

    var l=0;
    var ok =1;
    Product.find(null)
        .then()
        .then();
    if(typeof(req.body.productId) !== "undefined") {
        req.body.productId.forEach(function (element) {
            l=l+1;
            console.log(element);
            Product.findById(element)
                .then(result =>
                {
                    if(result === null)
                    {
                        ok=0;
                        res.status(200).json({
                            message: "Object with that id does not exist. Position: " + l
                        });
                    }
                })
                .catch(err=>{
                    ok=0;
                    res.status(200).json({
                        message: "Object with that id does not exist. Position: " + l
                    });
                })
        });
    }
    if(ok ===1) {
        const company = new Company({
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            netIncome: req.body.netIncome,
            location: req.body.location,
            products: req.body.productId
        });
        company.save()
            .then(result => {
                console.log(result);
                res.status(201).json(result);

            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            })
    }
});

router.get("/:id",(req,res,next)=>{
   Company.findById(req.params.id)
       .exec()
       .then(result=>{
           if(!result)
           {
               return res.status(404).json({
                   message: "Company not found"
               })
           }
           res.status(200).json(result);
       })
       .catch(err=>{
           res.status(500).json({
              error: err
           });
       })
});

router.delete("/:id",checkAuth,(req,res,next)=>{
    Company.remove({_id: req.params.id})
        .exec()
        .then(result=>{
            res.status(200).json({
                message: "Company deleted"
            })
        })
        .catch(err=>{
            res.status(500).json({
                error: err
            });
        })
});

module.exports= router;