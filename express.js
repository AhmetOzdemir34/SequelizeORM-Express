//imports
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const db = require('./database');
const userRoute = require('./routes/user-route');
const operationsRoute = require('./routes/operations-route');

require('dotenv').config({
    debug: true
});

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(cookieParser());

//db connecting
db.PG_DB(); // will be created your database
db.CONNECT_DB(); // connecting database 

//routes
app.use(userRoute);
app.use(operationsRoute);

//port listening
const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    //db.REFRESH_DB();
    console.log(`localhost:${port} is active!`);
});

/*
task modeli oluştur
sequelize'a tanıt
route yaz
ctrl yaz
*/