const express=require('express')
const path=require('path')

const rootDir=require('../util/path.js')

const contactusRouter=express.Router();

contactusRouter.get('/contact-us',(req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','contact_us.html'))

})

module.exports=contactusRouter;
