const express=require('express');
const bodyParser=require('body-parser');
const { format } = require('path');

const app=express()
app.use(bodyParser.urlencoded({extended: false}));
app.use('/add-product',(req,res,next)=>{
    res.send('<form action="/product" method="POST"> <input type="text" name="title" placeholder="Product Name"> <input type="number" name="size" placeholder="size"> <button type="submit">Add Product</button> </form>')
    
})
app.post('/product',(req,res,next)=>{
    console.log(req.body);
    res.redirect('/');
})
app.use('/',(req,res,next)=>{
    res.send('<h1>Welcome to express</h1>')
})

app.listen(4000);