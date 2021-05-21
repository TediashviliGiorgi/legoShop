const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const ProductSchema = new Schema({
 
    name: {
        type: String,
        default: ''
    }, 
    description : {
        type: Array,
        default: []
    },  

    code: {
        type: String,
        default: ''
    },  
    quantity: {
        type: Number,
        default: 1
    },
    price: {
        type: Number,
        default: 0
    }, 
    disscountPrice: {
        type: Number,
        default: 0
    },
    categories: {
        type: Array,
        default: [],
    }, 
    images: {
        type: Array,
        default: []
    },
    createDate: {
        type: Date,
        default: Date.now
    }
 
})


module.exports = Product = mongoose.model('Product', ProductSchema)