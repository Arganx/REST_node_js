const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const products = require('./routes/products');
const company = require('./routes/company');
const morgan = require('morgan');


const user = require('./routes/user');

//set up Express
const app=express();


//connect to mongo db
mongoose.connect("mongodb://localhost/ie").then(function () {
    console.log("Connected to database");
});
mongoose.Promise = global.Promise;

app.use(morgan('dev'));

app.use("/uploads",express.static('uploads'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use((res,req,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','*');
    if(req.method === 'OPTIONS')
    {
        res.header('Access-Control-Allow-Methods',"*");
        return res.status(200).json({});
    }
    next();
});

//routs initialization
app.use("/user",user);
app.use("/products",products);
app.use("/company",company);


//error handling
app.use((req,res,next) =>{
   // console.log("HI");
   const error = new Error('not found');
   error.status=404;
   next(error);
});

app.use(function (error,req,res,next) {
    //console.log(error);
    res.status(error.status || 500);
    res.json({
       error: {
           message: error.message
       }
    });
});

/*
app.get("/",function (req,res) {
    console.log("Get request");
    res.json({name: "Argan"});
});
*/


//listen for request

app.listen(4000,function () {
    console.log("Listening for request");
});