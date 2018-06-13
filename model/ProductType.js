const mongoose = require("mongoose");

const Schema = mongoose.Schema;


//Create Product schema

const productTypeSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: [true, "Name field is required"]
    },
    type:{
        type: String,
        required: [true, "Type field is required"]

    },
    averagePrice:{
        type: Number,
        required: [true, "Price field is required"]
    },
    productImage:{
        type: String
    }

});

const ProductTypes = mongoose.model('productType',productTypeSchema);

module.exports= ProductTypes;