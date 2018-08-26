var mongoose = require('mongoose');


var orderSchema = mongoose.Schema({
    customerID: [{type:mongoose.Schema.ObjectId, ref: "User"}], //3
    customer_adress: String,
    our_adress: String,
    cases: Number,
    bins: Number,
    Vflats: Number,
    Vflats_option: String,
    additional: Number,
    additional_option: String,
    notes: String,
    date_time: Date,
    type: String,
    price: {
        type:Number,
        default: 20,
    },
    confirmed: { //1
        type: Boolean,
        default: false
    },
    payed: { //2
        type: Boolean,
        default: false
    }
})

var Order = mongoose.model('Order', orderSchema);

module.exports = Order;

/*
    case - 20$
    Bin - 30$
    Vflat - 50$
*/