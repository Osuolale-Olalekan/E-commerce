const express = require('express')
const { ProductModel } = require('../models/product.model')

const addProduct = (req,res)=>{
    const { title, price, description, image, quantity } = req.body

    const product = new ProductModel({
        title,
        price,
        description,
        image,
        quantity
    })
    product.save()
    .then((data)=>{
        res.send({status:true, message:data})
    })

    .catch((err)=>{
        res.send({status:false, message:err})
    })
}

const allProduct = (req,res)=>{
    ProductModel.find()
    .then((data)=>{
        res.send({status:true, data})
    })
    .catch((err)=>{
        res.send({status:false, message:'Unable to fetch'})
    })
}


const deleteProduct = (req,res)=>{
        
        const id  = req.params.id
        // console.log(id);
        
    
        ProductModel.findByIdAndDelete(id)
            .then((data) => {
                res.send({ status: true, message: 'product deleted succesfully', data })
            
            .catch((err)=>{
                res.send({status:false, message:'Internal server error'})
            })
            });

}

    const editProduct =  (req,res)=>{
        const id = req.params.id
        const updates = req.body
        ProductModel.findByIdAndUpdate(id, updates,  { new: true})

        .then((data)=>{
            res.send({status:true, message:"Product updated succesfully",data})
        })
        .catch((err)=>{
            res.send({status:false, message:'Internal server error'})
        })
    }


module.exports = { addProduct, allProduct, deleteProduct, editProduct }