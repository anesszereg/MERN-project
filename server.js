const express = require("express")
const app = express()
require("dotenv").config({path:'./Config/.env'})
require("./Config/db");
const userRoutes =require('./routes/user.routes')

const bodyParser =require('body-parser')






app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))






// routes 

app.use('/api/user',userRoutes)


//server
app.listen(process.env.PORT,()=>{
    console.log(`connecting on port ${process.env.PORT}`);
})


