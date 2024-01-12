const express = require('express')
const mysql =require('mysql2')
const cors = require('cors');
const myconn = require('express-myconnection');
const routesPeliculas = require('./routes/routesPeliculas');
const routesSeries = require('./routes/routesSeries');
const app = express();

app.set('port', process.env.PORT || 9000);

const dbOptions = {

    host: 'localhost',
    port:3306,
    user: 'root',
    password: 'ArellunasM13',
    database:'pelisp',
    
};

    


//middelwares--------------------------------------------
app.use(myconn(mysql,dbOptions,'single'));
app.use(express.json());
app.use(cors());


//rutas--------------------------------------------------
app.get('/',(req,res)=>{
    res.send('si jalo che tonto')
})

app.use('/Peliculas',routesPeliculas)
app.use('/Series',routesSeries)


//Servidor corriendo--------------------------------------
app.listen(app.get('port'),()=>{
    console.log('server corriendo en el puerto', app.get('port'));
});
