const mongoose = require("mongoose");

const Schema = mongoose.Schema;


//Create company schema

const companySchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        type: String,
        required: [true, "Name field is required"]
    },
    netIncome:{
        type: Number
    },
    location: {
        type: [Number],
        default: [0, 0]
    },
    products: {
        type: [mongoose.Schema.Types.ObjectId], ref: 'productType'
    }

});

const Company = mongoose.model('company',companySchema);

module.exports= Company;