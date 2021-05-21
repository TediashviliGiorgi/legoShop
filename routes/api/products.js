const express = require('express')
const router = express.Router() 
const cloudinary = require('cloudinary').v2 
const Product = require('../../models/Product') 




// @route    GET api/products
// @desc     Get all products
// @access   Public
router.get('/' , ( req, res) => {
    Product
    .find()
    .sort( { createDate:  -1 } )
    .then(  records =>   res.send(records)) 
})
 




// @route    Delete api/products
// @desc     Delete a product
// @access   Public
router.put('/' , ( req , res) => {
    Product.findById(req.body._id)
       .then(user => user.remove().then(() => res.json({success: true})))
       .catch(err => res.status(404).json({success: false}))
})
 




// @route    GET api/products/:id
// @desc     Get product by id
// @access   Public
router.get('/get/:id' , ( req, res) => { 
  Product.find({_id: req.params.id})  
      .then( data =>  { res.send(data)  })
      .catch(err => res.status(404).json({success: false}))
})




// @route   POST api/proucts
// @desc    Create  a product
// @access  Public
router.post(
    '/create', 
    (req, res) => {
    
        // Get fields
        const productFields = {}  
        if (req.body.name != null) productFields.name = req.body.name;  
        if (req.body.categories != null) productFields.categories = req.body.categories; 
        if (req.body.description != null) productFields.description = req.body.description;  
        if (req.body.price != null) productFields.price = req.body.price;  
        if (req.body.disscountPrice != null) productFields.disscountPrice = req.body.disscountPrice; 
        if (req.body.quantity != null) productFields.quantity = req.body.quantity;  
        if (req.body.code != null) productFields.code = req.body.code; 
        if (req.body.images != null) productFields.images = req.body.images;
   
        Product.findOne( { code: req.body.code}  ).then(db_record => {
        if (db_record) {
            res.json({status: "The product code already exists, Please try with different code "}) 
        } else { 
            new Product(productFields).save().then(product => res.json({status: "Created", product})) 
        }
        })
      

    }
  )
  




// @route   POST api/products/update
// @desc    Update product
// @access  Public
router.post(
  '/update', 
  (req, res) => { 
      // Get fields
      const productFields = {}  
      if (req.body.name != null) productFields.name = req.body.name; 
      if (req.body.categories != null) productFields.categories = req.body.categories; 
      if (req.body.description != null) productFields.description = req.body.description;  
      if (req.body.price != null) productFields.price = req.body.price;  
      if (req.body.disscountPrice != null) productFields.disscountPrice = req.body.disscountPrice; 
      if (req.body.quantity != null) productFields.quantity = req.body.quantity;  
      if (req.body.code != null) productFields.code = req.body.code;  
      if (req.body.images != null) productFields.images = req.body.images;
    
      Product.findOne( { _id: req.body._id}  ).then(db_record => { 
      if (db_record) {
           // Update
          Product.findOneAndUpdate(
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






// @route   POST api/products/upload
// @desc    Upload product image
// @access  Public
router.post(
  '/upload', 
  async (req, res) => {
       
    try{
      const CLOUDINARY_API_KEY = '337589398971936'
      const CLOUDINARY_API_SECRET = 'pQ3Px_k-VNL26L9Ab4O3MhQZSBw'
      const CLOUDINARY_NAME = 'dctglbpob'
   
      cloudinary.config({
          cloud_name: CLOUDINARY_NAME,
          api_key: CLOUDINARY_API_KEY,
          api_secret: CLOUDINARY_API_SECRET,
      }) 
      // Get data
       const base64EncodedImage = req.body.data 
       const fileStr = base64EncodedImage 
       const uploadResponse = await cloudinary.uploader.upload(fileStr)
     
       if(uploadResponse != null && uploadResponse != undefined){ 
        
         if(uploadResponse.hasOwnProperty('url')){  
          res.json({succeed: true, url: uploadResponse.url})
         }else{ 
           res.json({succeed: false, url: ''})
         }
       }else{ 
         res.json({succeed: false, url: ''})
       } 
    }catch(e){ 
      res.json({succeed: false, url: ''})
    } 
  }
) 
 
module.exports = router