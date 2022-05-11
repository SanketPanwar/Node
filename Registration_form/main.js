const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const router=require('./routes/user');
const axios = require('axios').default;
const sequelize=require('./util/database');

const app=express();


app.use(cors())
app.use(bodyParser.json())
app.use(router)
app.use(axios)
sequelize.sync()
.then(app.listen(4000))
.catch(err=>{
    console.log(err)
})

