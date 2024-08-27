const mongoose=require ('mongoose')
const express=require('express')
const app= express();//const re=require('')

app.use(express.json())
// mongoose.connect('mongodb://localhost:27017/lat_task').then(()=>{
//     console.log("Connect");})
const databs= require('./database/db.js'); 
    console.log("ali")
    const sign=require('./routes/userRoutes.js')
    app.use('/cv',sign)



app.listen(4000,()=>{
    console.log("server is working http://localhost//4000")
})