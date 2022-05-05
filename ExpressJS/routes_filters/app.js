
const express=require('express');
const bodyParser = require('body-parser');

const adminroute=require('./routes/admin')
const shoproute=require('./routes/shop')

const app=express();

app.use(bodyParser.urlencoded({extended:false}));

app.use('/admin',adminroute);
app.use('/shop',shoproute);
app.use((req,res,next)=>{
    res.status(404).send('<h1>Page Not Found</h1>')
})

app.listen(4000);





