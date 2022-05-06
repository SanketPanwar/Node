const express=require('express');

const loginRoute=require('./login.js');
const messagerRoute=require('./message.js')

const bodyParser=require('body-parser');

const app=express();
app.use(bodyParser.urlencoded({extended :true}))
app.use(loginRoute);
app.use(messagerRoute);

app.listen(4000)