
const express = require("express");
const connect = require('./config/db')
const userController = require("./controllers/user.controller")

const app = express()
app.use(express.json())

app.use('/users', userController )



const start = async () =>{
    await connect();

    app.listen(2345,  () =>{
        console.log('listening on port 2345')
    })
}

module.exports = start