const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // para hashear las contraseñas
require('dotenv').config({ path: './llave.env' });


const usuariosSchema = require("../models/usuarios")
const router = express.Router();

router.post('/usuarios/crear/conhash', async (req, res) => {
    try {
        const { userName, password } = req.body;

        // Hashear la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10); // '10' es el número de rounds para el hash

        // Crear un nuevo documento de usuario con la contraseña hasheada
        const nuevoUsuario = new usuariosSchema({
            userName: userName,
            password: hashedPassword // Guardar la contraseña hasheada en la base de datos
        });

        // Guardar el nuevo usuario en la base de datos
        const usuarioGuardado = await nuevoUsuario.save();
        
        res.json(usuarioGuardado); // Devolver el usuario guardado en la respuesta
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
    }
});

router.get('/usuarios/consulta', (req,res)=>{
    usuariosSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json((error)));
});

router.delete('/usuarios/elimina/:id', (req,res)=>{
    const {id} = req.params;
    usuariosSchema
    .deleteOne({_id: id})
    .then((data) => res.json(data))
    .catch((error) => res.json((error)));
});


// Endpoint para autenticar usuarios
const secret = process.env.SECRET;
router.post('/usuarios/login', async (req, res) => {
    try {
        const { userName, password } = req.body;
        const usuario = await usuariosSchema.findOne({ userName });

        if (!usuario) {
            return res.status(401).json({ message: 'Usuario o incorrecto' });
        }

        const passwordValido = await bcrypt.compare(password, usuario.password);
        if (!passwordValido) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Si las credenciales son válidas, generamos un token JWT
        const token = jwt.sign(
            { userId: usuario._id, userName: usuario.userName },
            secret,
            { expiresIn: '1h' } 
        );

        res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al autenticar el usuario' });
    }
});
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTU0NGVjOTA2YTBjMDVkZGI1MGNjYzciLCJ1c2VyTmFtZSI6Ikpvc2UiLCJpYXQiOjE3MDAwMjkwMDUsImV4cCI6MTcwMDAzMjYwNX0.h6ZUitSjeXUzJkvKckY8m1blA6Tf507s3pZPb6N0F5E
//validar token
router.post("/usuarios/validar", (req, res) => {
    try {
        
        const token = req.body.token;
  
      if (!token) {
        return res.status(401).send({ message: "Token no proporcionado" });
      }
  
      const payload = jwt.verify(token, secret);
  
      if (Date.now() > payload.exp * 1000) {
        return res.status(401).send({ error: "Token expirado" });
      }
      const alerta="Acceso permitido"
      res.status(200).json(alerta);
    } catch (error) {
      console.error(error);
      return res.status(401).send({ message: "Hubo un error al validar el token" });
    }
});


module.exports = router;