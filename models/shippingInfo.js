const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const shippingInfo = Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    zipCode:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    comment:{
        type: String,
        required: false
    }
});

let ShippingInfo = mongoose.model('ShippingInfo',shippingInfo);

module.exports = ShippingInfo;