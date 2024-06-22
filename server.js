const express = require("express");
const app = express();
const port=3000;
const mongoose = require("mongoose");
const Product=require("./model/productModel");
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//fetch all products
app.get('/products',async(rq,res)=>{
    try {
        const product=await Product.find({});
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})
//fetch a specific product
app.get('/products/:id',async (req,res)=>{
    try {
        const {id}=req.params;
        const product =await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
//save product to database
app.post('/products',async(req, res) => {

    try {
     const product=await Product.create(req.body)
     res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
});

//update product
app.put('/products/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const product=await Product.findByIdAndUpdate(id,req.body);
       
        if (!product) {
            return res.status(404).json({message:`can't find the Id ${id}`});
        }
        const products=await Product.findById(id);
        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({message:error.message});
    }
})
//Delete product
app.delete('/products/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const product=await Product.findByIdAndDelete(id,req.body);
       
        if (!product) {
            return res.status(404).json({message:`can't find the Id ${id}`});
        }
        const products=await Product.find({});
        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({message:error.message});
    }
})
app.get("/",(req,res)=>{
    res.send("home paage")
    });
app.get("/about",function(req,res){
     res.send("About Page");
});
   

    mongoose.connect('mongodb+srv://root:5A5mUEoIXJqKDlVV@mohamed.nfp9whb.mongodb.net/Node-Api?retryWrites=true&w=majority&appName=mohamed')
    .then(()=>{
        app.listen(port,()=>{
            console.log("db connected");
            console.log("server is running on port "+port);
        });
        
    }).catch((error)=>{
        console.log(error)
    })

    