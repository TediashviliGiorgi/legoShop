const express = require('express')
const router = express.Router() 


// User Model
const Order = require('../../models/Order') 

// @route    GET api/orders
// @desc     Get all orders
// @access   Public
router.get('/', ( req, res) => {
    Order
    .find()
    .sort( { createDate:  -1 } )
    .then(  records =>   res.send(records)) 
})
 
// @route    Delete api/orders
// @desc     Delete a orders
// @access   Public
router.put('/' , ( req , res) => {
    Order.findById(req.body._id)
       .then(user => user.remove().then(() => res.json({success: true})))
       .catch(err => res.status(404).json({success: false}))
})
 
// @route   POST api/orders
// @desc    Create  a orders
// @access  Public
router.post(
    '/create', 
    (req, res) => {
    
        // Get fields
        const orderFields = {}  
        if (req.body.status != null) orderFields.status = req.body.status; 
        if (req.body.totalPrice != null) orderFields.totalPrice = req.body.totalPrice; 
        if (req.body.customerName != null) orderFields.customerName = req.body.customerName; 
        if (req.body.customerAddress != null) orderFields.customerAddress = req.body.customerAddress; 
        if (req.body.items != null) orderFields.items = req.body.items; 
        if (req.body.deliveryDate != null) orderFields.deliveryDate = req.body.deliveryDate; 
        if (req.body.status != null) orderFields.status = req.body.status; 
        
        new Order(orderFields).save().then(order => res.json({status: "Created", order})) 
          
    }
  )
  
// @route   POST api/orders/update
// @desc    Update orders
// @access  Public
router.post(
  '/update', 
  (req, res) => {
       
      // Get fields
      const orderFields = {}  
      if (req.body.status != null) orderFields.status = req.body.status; 
      if (req.body.totalPrice != null) orderFields.totalPrice = req.body.totalPrice; 
      if (req.body.customerName != null) orderFields.customerName = req.body.customerName; 
      if (req.body.customerAddress != null) orderFields.customerAddress = req.body.customerAddress; 
      if (req.body.items != null) orderFields.items = req.body.items; 
      if (req.body.deliveryDate != null) orderFields.deliveryDate = req.body.deliveryDate; 
      if (req.body.status != null) orderFields.status = req.body.status;

   

      Product.findOne({ _id: req.body._id}).then(db_record => {

      if (db_record) {
           // Update
          Order.findOneAndUpdate(
            { _id: req.body._id },
            { $set: productFields }, 
            { new: true }
          ).then(product => res.json({status: 'updated', product}));
      } else {
         res.status(404).json({status: "Please refresh and try again!"}) 
      }
    })
  }
) 
 
module.exports = router