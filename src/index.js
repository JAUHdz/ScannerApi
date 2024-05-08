const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config({ path: './llave.env' });

const servmongo = process.env.DB_MONGO;
const usuariosRutas = require('./routes/usuarios');
const scannerRutas = require('./routes/scanner');

const cors = require('cors');

const app = express();
const port = process.env.PORT || 9000;
const dbName = 'AppScanner';


//Cors Permitir solicitudes de todos los origenes
app.use(cors());

app.use(express.json());
app.use('/api', usuariosRutas);
app.use('/api', scannerRutas);

//mongo db conection

mongoose.connect(/* llave para acceder a bd*/ servmongo)
.then(() => {
    console.log('Conectado a Mongo');
    const db = mongoose.connection.db; // Obtener la base de datos desde la conexión de Mongoose
    console.log(`Usando la base de datos "${dbName}"`);
})
.catch((error)=> console.error);



app.listen(port, ()=> console.log('El servidor esta escuchando en el puerto', port)); 