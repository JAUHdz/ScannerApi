const express = require("express");
require('dotenv').config({ path: './llave.env' });

const CatAditivosSchema  = require("../models/cat_aditivos")
const router = express.Router();

router.post('/cat_aditivos/crear', (req,res)=>{
    const reg = CatAditivosSchema(req.body);
    reg.save()
    .then((data) => res.json(data))
    .catch((error) => res.json((error)));
});

router.get('/cat_aditivos/consulta', (req,res)=>{
    CatAditivosSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json((error)));
});

router.put('/cat_aditivos/actualiza/:id', (req,res)=>{
    const {id} = req.params;
    const {nom_aditivo, nom_contenedor,descripcion_aditivo,validacion,fecha,localizacion,usuusuario} = req.body;
    CatAditivosSchema
    .updateOne({_id: id},{$set:{ nom_aditivo, nom_contenedor,descripcion_aditivo,validacion,fecha,localizacion,usuusuario }})
    .then((data) => res.json(data))
    .catch((error) => res.json((error)));
});

router.delete('/cat_aditivos/elimina/:id', (req,res)=>{
    const {id} = req.params;
    CatAditivosSchema
    .deleteOne({_id: id})
    .then((data) => res.json(data))
    .catch((error) => res.json((error)));
});

module.exports = router;