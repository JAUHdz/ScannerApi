const express = require("express");
require('dotenv').config({ path: './llave.env' });

const usuariosEstadoSchema  = require("../models/usu_cat_estado")
const router = express.Router();

router.post('/usu_cat_estado/crear', (req,res)=>{
    const reg = usuariosEstadoSchema(req.body);
    reg.save()
    .then((data) => res.json(data))
    .catch((error) => res.json((error)));
});

router.get('/usu_cat_estado/consulta', (req,res)=>{
    usuariosEstadoSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json((error)));
});

router.put('/usu_cat_estado/actualiza/:id', (req,res)=>{
    const {id} = req.params;
    const {nom_estado, descripcion_estado} = req.body;
    usuariosEstadoSchema
    .updateOne({_id: id},{$set:{ nom_estado, descripcion_estado }})
    .then((data) => res.json(data))
    .catch((error) => res.json((error)));
});

router.delete('/usu_cat_estado/elimina/:id', (req,res)=>{
    const {id} = req.params;
    usuariosEstadoSchema
    .deleteOne({_id: id})
    .then((data) => res.json(data))
    .catch((error) => res.json((error)));
});

module.exports = router;