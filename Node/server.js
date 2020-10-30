const express = require("express");

const cors=require('cors')    

var app = express();
const port = 8080;
const host = "localhost";
const app1=require('./app')

app.use(express.static('uploads'));
app.use(cors());
app.use('/',app1);
 
app.listen(port,()=>{
    console.log("server is listening at port 8080")
})

