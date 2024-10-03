const express = require('express')
const app = express()
const productRoute = require('./routes/product.route')
const mongoose = require('mongoose')

app.use(express.urlencoded({extended:true}))  //so it can see the BODY content inside the form
app.use(express.json()) 
require('dotenv').config()

const URI = process.env.DATABASE_URI

mongoose.connect(URI)
.then(()=>{
    console.log('You are connected to Mongoose');
})
.catch((err)=>{
    console.log(err);
    
})

app.use('/product', productRoute)

// const ProductSchema = mongoose.Schema({
//     title:{type:String, require:true},
//     price:{type:Number, require:true},
//     description:{type:String, require:true},
//     image:{type:String, require:true},
//     quantity:{type:Number, require:true},
//     date_created:{type:Date, default: Date.now}
// })


app.get('/', (req,res)=>{
    res.send('Hello Dude😂')
})


// const ProductModel = mongoose.model('product_collection', ProductSchema)



// app.post('/add-product', (req,res)=>{

    // const { title, price, description, image, quantity } = req.body
    // const product = new ProductModel({
    //     title,
    //     price,
    //     description,
    //     image,
    //     quantity
    // })

    // product.save()
    // .then((data)=>{
    //     res.send({status:true, message:data})
    // })
    // .catch((err)=>{
    //     res.send({status:false, message:err})
    // })
// })











const PORT = 5001
app.listen(PORT, (err)=>{
    if (err){
        console.log('Error connecting to server');
        
    }
    else {
        console.log("You are connected to port", PORT );
        
    }
})


//MVCR
// Model, View, COntrol, ROute