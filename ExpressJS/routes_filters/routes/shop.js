const express=require('express')

const router=express.Router();

// /shop/
router.get('/',(req,res,next)=>{
    res.send('<h1>Welcome to Shop</h1>')
})

module.exports=router;