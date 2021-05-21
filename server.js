const express = require('express')
const mongoose = require('mongoose')  
 
let db = require('./config/keys').mongoURI 
const app = express() 
const  cors = require('cors');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// connect to database
mongoose
    .connect(db )
    .then(() => console.log('Connected to mongoDB ...'))
    .catch(err => console.log(err)) 

// parser middleware
 
app.use(express.json({extended: false, limit: '100mb'})) 
app.use(express.urlencoded({limit: '100mb'})) 
app.use(cors({origin: true, credentials: true})) 
// parser middleware
app.use(express.json({ extended: false})) 
 
  
 
app.use('/api/users',  require('./routes/api/user')) 
app.use('/api/products',  require('./routes/api/products')) 
 


// listening server on dev port
const PORT = process.env.PORT || 5000  
 
 
app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`)
  console.log(`URL:  localhost:3000`)
})
 