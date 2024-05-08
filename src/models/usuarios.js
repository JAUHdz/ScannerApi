const mongoose = require('mongoose');
const usuariosSchema = mongoose.Schema({
    userName:{
        type: String,
        require
    },
    password:{
        type: String,
        require
    }
});
module.exports = mongoose.model('usuarios',usuariosSchema);