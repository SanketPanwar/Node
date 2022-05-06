const express=require('express')

const router=express.Router();

router.get('/login',(req,res,next)=>{
    res.send('<form onsubmit="localStorage.setItem(`user`, document.getElementById(`user`).value)" action="/adduser" method="POST"> <input type="text" name="username" id="user"  placeholder="username"/> <button type="submit">Submit</button></form>')

})
router.post('/adduser',(req,res,next)=>{
    res.redirect('/')
})

module.exports=router;