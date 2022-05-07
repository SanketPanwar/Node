const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine','ejs');
app.set('views',__dirname +'/views');

const adminRoute = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const contactusroutes=require('./routes/contactus')
const errorController=require('./controllers/error')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin',adminRoute);
app.use(shopRoutes);
app.use(contactusroutes)
// app.post('/success',(req,res,next)=>{                       // for handling when contact us form is filled
//   res.send('<h1>Form Filled Succesfully</h1>')
// })

app.use(errorController.get404);

app.listen(4000);
