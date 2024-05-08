const mongoose = require('mongoose');
const scannerSchema = mongoose.Schema({
    usuario:{
        type: String,
        require
    },
    aditivo:{
        type: String,
        require
    },
    contenedor:{
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
    }
});
module.exports = mongoose.model('scanner',scannerSchema);