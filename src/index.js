const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config({ path: './llave.env' });

const servmongo = process.env.DB_MONGO;
const usuariosRutas = require('./routes/usuarios');
const scannerRutas = require('./routes/scanner');
const usuarioTipo = require('./routes/usu_cat_tipo_usuario');
const usuarioEstado = require('./routes/usu_cat_estado');
const usuUsuarios = require('./routes/usu_usuario');
const catAditivos = require('./routes/cat_aditivos');

const cors = require('cors');

const app = express();
const port = process.env.PORT || 9000;
const dbName = 'AppScanner';


//Cors Permitir solicitudes de todos los origenes
app.use(cors());

app.use(express.json());
app.use('/api', usuariosRutas);
app.use('/api', scannerRutas);
app.use('/api', usuarioTipo);
app.use('/api', usuarioEstado);
app.use('/api', usuUsuarios);
app.use('/api', catAditivos);

//mongo db conection

mongoose.connect(/* llave para acceder a bd*/ servmongo)
.then(() => {
    console.log('Conectado a Mongo');
    const db = mongoose.connection.db; // Obtener la base de datos desde la conexión de Mongoose
    console.log(`Usando la base de datos "${dbName}"`);
})
.catch((error)=> console.error);



app.listen(port, ()=> console.log('El servidor esta escuchando en el puerto', port)); 