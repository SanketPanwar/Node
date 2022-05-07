const express=require('express')
const path=require('path')

const rootDir=require('../util/path.js')
const contatusController=require('../controllers/contactus')

const contactusRouter=express.Router();

contactusRouter.get('/contact-us',contatusController.getContactus)

contactusRouter.post('/success',contatusController.formSuccess)

module.exports=contactusRouter;
