const express=require('express');
const bodyParser=require('body-parser')
const mysql=require('mysql');
const cors = require("cors");
require('dotenv').config();
const app=express();


//MY ROUTES
const labtestRoutes=require('./routes/labtest')

//DB import
const db=require('./db')



//MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());


//MY ROUTES
app.use("/api",labtestRoutes)

app.listen('8000',()=>{
    console.log('Server started at Port 8000')
})




module.exports=db;