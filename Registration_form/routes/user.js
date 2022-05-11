const express=require('express');

const router=express.Router();

const controller=require('../controller/user')

router.get('/getusers',controller.getusers)

router.post('/addnewuser',controller.addNewUser)

router.delete('/deleteuser/:id',controller.deleteuser)

module.exports=router;