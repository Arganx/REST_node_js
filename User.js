const mongoose = require("mongoose");

const Schema = mongoose.Schema;


//Create Product schema

const userSchema = new Schema({
    _id: mongoose.Schema.ObjectId,
    name: {
        type: String,
        default: "User"
    },
    password:{
        type: String,
        required: [true, "Password field is required"]

    },
    email:{
        type: String,
        required: [true, "Email field is required"],
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    }

});

const User = mongoose.model('User',userSchema);

module.exports= User;