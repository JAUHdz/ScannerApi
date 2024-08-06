const mongoose = require('mongoose');
const usuariosTipoSchema = mongoose.Schema({
    nom_tipo:{
        type: String,
        require
    },
    descripcion_tipo:{
        type: String,
        require
    }
});
module.exports = mongoose.model('usu_cat_tipo',usuariosTipoSchema);