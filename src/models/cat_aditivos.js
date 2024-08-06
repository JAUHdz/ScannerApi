const mongoose = require('mongoose');
const CatAditivosSchema = mongoose.Schema({
    nom_aditivo:{
        type: String,
        require
    },
    nom_contenedor:{
        type: String,
        require
    },
    descripcion_aditivo:{
        type: String,
        require
    },
    validacion:{
        type: String,
        require
    },
    fecha:{
        type: String,
        require
    },
    localizacion:{
        type: String,
        require
    },
    usuusuario:{
        type: String,
        require
    }
});
module.exports = mongoose.model('cat_aditivos',CatAditivosSchema);