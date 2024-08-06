const express = require("express");
require('dotenv').config({ path: './llave.env' });

const UsuusuariosSchema  = require("../models/usu_usuarios")
const router = express.Router();

router.post('/usu_usuarios/crear', (req,res)=>{
    const reg = UsuusuariosSchema(req.body);
    reg.save()
    .then((data) => res.json(data))
    .catch((error) => res.json((error)));
});

router.get('/usu_usuarios/consulta', (req,res)=>{
    UsuusuariosSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json((error)));
});
router.get('/usu_usuarios/consulta/:id', (req,res)=>{
    const {id} = req.params;
    UsuusuariosSchema
    .findOne({_id: id})
    .then((data) => res.json(data))
    .catch((error) => res.json((error)));
});
router.get('/usu_usuarios/consulta/nombre/:nombre', (req, res) => {
    const { nombre } = req.params;
  
    UsuusuariosSchema.findOne({ nom_usuario: nombre })
      .then((data) => {
        if (!data) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(data);
      })
      .catch((error) => res.status(500).json({ message: 'Error al buscar usuario', error }));
  });
router.put('/usu_usuarios/actualiza/:id', (req,res)=>{
    const {id} = req.params;
    const {nom_usuario, contrasena,usucatestado,usucattipo} = req.body;
    UsuusuariosSchema
    .updateOne({_id: id},{$set:{ nom_usuario, contrasena,usucatestado,usucattipo }})
    .then((data) => res.json(data))
    .catch((error) => res.json((error)));
});

router.delete('/usu_usuarios/elimina/:id', (req,res)=>{
    const {id} = req.params;
    UsuusuariosSchema
    .deleteOne({_id: id})
    .then((data) => res.json(data))
    .catch((error) => res.json((error)));
});

module.exports = router;