var express=require('express');
var app=express();
var path=require('path');
const lev=require('./routes/lev')
const home=require('./routes/home')

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use('/',home)
app.use('/lev',lev)

app.listen(3000)


 
