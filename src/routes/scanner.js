const express = require("express");

const scannerSchema = require("../models/scanner")
const router = express.Router();

router.post('/scanner/crear', (req,res)=>{
    const reg = scannerSchema(req.body);
    reg.save()
    .then((data) => res.json(data))
    .catch((error) => res.json((error)));
});

router.get('/scanner/consulta', (req,res)=>{
    scannerSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json((error)));
});

//actualizar
router.put('/scanner/actualiza/:id', (req,res)=>{
    const {id} = req.params;
    const {usuario, aditivo,validacion,fecha} = req.body;
    scannerSchema
    .updateOne({_id: id},{$set:{ usuario, aditivo,validacion,fecha }})
    .then((data) => res.json(data))
    .catch((error) => res.json((error)));
});

//Eliminar
router.delete('/scanner/elimina/:id', (req,res)=>{
    const {id} = req.params;
    scannerSchema
    .deleteOne({_id: id})
    .then((data) => res.json(data))
    .catch((error) => res.json((error)));
});

module.exports = router;