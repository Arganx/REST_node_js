const express = require("express");
const router = express.Router([]);
const User = require("../model/User");
const mongoos = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

router.post("/signUp",(req,res,next)=>{

    User.find({email: req.body.email})
        .exec()
        .then(user =>{
            if(user.length>=1)
            {
                return res.status(409).json({
                    message: "Email already in use"
                });
            }
            else
            {
                console.log(req.body.password);
                bcrypt.hash(req.body.password,10,(err,hash)=>{
                    if(err)
                    {

                        console.log(err);
                        return res.status(500).json({
                            error: err
                        });
                    }
                    else{
                        const user = new User({
                            _id: mongoos.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            name: req.body.name
                        });
                        user.save()
                            .then(result=>{
                                console.log(result);
                                res.status(201).json({
                                    message: "User created"
                                });
                            })
                            .catch(err=>{
                                console.log(err);
                                res.status(500).json({
                                    message: "You must enter a valid email address"
                                });
                            });
                    }
                })
            }
        });





});

router.post("/login",(req,res,next)=>{
   User.find({email: req.body.email})
       .exec()
       .then(users=>{
            if(users.length<1)
            {
                return res.status(401).json({
                    message: "Login Failed"
                });
            }
            bcrypt.compare(req.body.password,users[0].password,(err,result)=>{
               if(err)
               {
                   return res.status(401).json({
                       message: "Login Failed"
                   });
               }

               if(result)
               {
                   const token = jwt.sign({
                       email: users[0].email,
                       userId: users[0]._id
                   },
                       process.env.JWT_KEY,
                       {
                           expiresIn: "1h"
                       }
                       );
                   return res.status(200).json({
                       message: "Login successful",
                       token: token
                   });
               }
               res.status(401).json({
                   message: "Login failed"
               });

            });
       })
       .catch(err=>{
           console.log(err);
           res.status(500).json({
               error: err
           });
       });
});

router.delete("/:id",(req,res,next)=>{
   User.remove({_id: req.params.id})
       .exec()
       .then(doc =>{
           res.status(200).json({
               message: "User deleted"
           })
       })
       .catch(err=>{
           console.log(err);
           res.status(500).json({
               error: err
           });
       });
});


module.exports = router;