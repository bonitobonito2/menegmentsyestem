const bodyParser = require("body-parser");
const express = require("express");
const app = express()
const { engine } = require('express-handlebars');
const mysql= require('mysql')




app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

app.use(express.static('public'))

app.engine('hbs',engine( { extname:'.hbs'}  ))
app.set('view engine',"hbs")

const routes = require('./server/routes/user')
app.use('/',routes)

app.listen(5000,(err,res)=>{
    if(err) throw err
    console.log('app hited port 5000')
})

