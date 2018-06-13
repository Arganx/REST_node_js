const express = require("express");
const router = express.Router([]);
const Company = require("../model/Company");
const Product = require("../model/ProductType");
const User = require("../model/User");



//Get a list from database
router.get("/ninjas",function (req,res,next) {
    /*    Ninja.find({}).then(function (ninjas) {
            res.send(ninjas);
        });*/

    Ninja.aggregate().near({
        near: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
        maxDistance: 0.1,
        spherical: true,
        distanceField: "dist.calculated"
    }).then(function (ninjas) {
        res.send(ninjas);
    });
});

//add new data
router.post("/ninjas",function (req,res,next) {
    Ninja.create(req.body).then(function (ninja) {
        res.send(ninja);
    }).catch(next);

});

//update
router.put("/ninjas/:id",function (req,res,next) {
    Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(function (ninja) {
        Ninja.findOne({_id: req.params.id}).then(function (ninja) {
            res.send(ninja);
        });
    });
});


//delete
router.delete("/ninjas/:id",function (req,res,next) {
    Ninja.findByIdAndRemove({_id: req.params.id}).then(function (ninja) {
        res.send(ninja);
    });
});


module.exports = router;