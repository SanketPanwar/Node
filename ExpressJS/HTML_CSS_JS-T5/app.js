const express=require('express')
const path=require('path')

const adminRoute=require('./routes/admin');
const shopRoute=require('./routes/shop')
const contactusRoute=require('./routes/contactus')

const bodyParser=require('body-parser');
const app=express();

app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.urlencoded({extended:true}));

app.use('/admin',adminRoute);
app.use(shopRoute);
app.use(contactusRoute);
app.post('/success',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'views','contactUsFormFilled.html'))
})

app.use('/',(req,res,next)=>{
    res.status(404).sendFile(path.join(__dirname,'views','404.html'))
})

app.listen(4000)