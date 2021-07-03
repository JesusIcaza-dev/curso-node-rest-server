const Rol = require('../models/rol');
const Usuario = require('../models/usuario');

const esRolValido = async (rol = '') => {
    const existeRol = await Rol.findOne({rol});
    if(!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
    }
}

const existeUsuarioPorId = async (id) => {
    const usuarioDb = await Usuario.findOne({_id: id});
    if( !usuarioDb )
        throw new Error(`El id del usuario ${id} no existe`);
}

const existeCorreo = async (correo) => {
    const correoDb = await Usuario.findOne({correo});
    if( correoDb )
        throw new Error(`El correo ${correo} ya esta registrado con otro usuario`);
}

module.exports = {
    esRolValido,
    existeCorreo,
    existeUsuarioPorId
}
