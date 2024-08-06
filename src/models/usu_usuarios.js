const mongoose = require('mongoose');
const UsuusuariosSchema = mongoose.Schema({
    nom_usuario:{
        type: String,
        require
    },
    contrasena:{
        type: String,
        require
    },
    usucatestado:{
        type: String,
        require
    },
    usucattipo:{
        type: String,
        require
    }
});
module.exports = mongoose.model('usu_usuarios',UsuusuariosSchema);