const express = require("express");
require('dotenv').config({ path: './llave.env' });

const usuariosTipoSchema  = require("../models/usu_cat_tipo_usuario")
const router = express.Router();

router.post('/usu_cat_tipo/crear', (req,res)=>{
    const reg = usuariosTipoSchema(req.body);
    reg.save()
    .then((data) => res.json(data))
    .catch((error) => res.json((error)));
});

router.get('/usu_cat_tipo/consulta', (req,res)=>{
    usuariosTipoSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json((error)));
});

router.put('/usu_cat_tipo/actualiza/:id', (req,res)=>{
    const {id} = req.params;
    const {nom_tipo, descripcion_tipo} = req.body;
    usuariosTipoSchema
    .updateOne({_id: id},{$set:{ nom_tipo, descripcion_tipo }})
    .then((data) => res.json(data))
    .catch((error) => res.json((error)));
});

router.delete('/usu_cat_tipo/elimina/:id', (req,res)=>{
    const {id} = req.params;
    usuariosTipoSchema
    .deleteOne({_id: id})
    .then((data) => res.json(data))
    .catch((error) => res.json((error)));
});

module.exports = router;