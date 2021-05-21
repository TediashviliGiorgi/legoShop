const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const OrderSchema = new Schema({
 
    status: {
        type: String,
        default: ''
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    customerName: {
        type: String,
        default: ''
    },
    customerAddress: {
        type: String,
        default: ''
    },
    customerMobile: {
        type: String,
        default: ''
    },
    items: {
        type: Array,
        default: []
    },
    deliveryDate: {
        type: String, 
        default: ''
    },
    createDate: {
        type: Date,
        default: Date.now
    }
 
})


module.exports = Order = mongoose.model('Order', OrderSchema)