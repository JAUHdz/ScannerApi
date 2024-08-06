const mongoose = require('mongoose');
const usuariosEstadoSchema = mongoose.Schema({
    nom_estado:{
        type: String,
        require
    },
    descripcion_estado:{
        type: String,
        require
    }
});
module.exports = mongoose.model('usu_cat_estado',usuariosEstadoSchema);