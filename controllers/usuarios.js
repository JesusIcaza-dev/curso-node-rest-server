const { response, request } = require('express');
const bcryp = require('bcryptjs');
const Usuario = require('../models/usuario');
const usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {
    // const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

    const { limite = 5, desde = 5 } = req.query;

    // skip para indicar la consulta que se haga desde el registro numero 5
    // limit para limitar los resultados de la consulta

    // De esta forma lanzamos las 2 querys simultaneamente y aparte la englobamos en una promesa global
    // y le ponemos el await para que se espere a la resolucion de todo ello
    // optimizacion de rendimiento en cuanto al tiempo de procesamiento
    // Desestructuracion de arreglo indicando que en la posicion 0 sera el total
    // Y en la posicion 1 se encontrara todos los demas usuarios retornados por la consulta
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({ estado: true }),
        Usuario.find({ estado: true}).skip(Number(desde)).limit(Number(limite))
        
    ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async (req, res = response) => {
    const {nombre, correo, password, rol} = req.body; // desestructuracion

    // creacion de la instancia de nuestro modelo de usuario de mongoose pasandole un objeto json con los datos extraidos del body
    const usuario = new Usuario({nombre, correo, password, rol});

    // Encriptar la contraseña
    // indica el numero de iteraciones que salteara la contraseña para volverla mas segura. Por defecto esta en 10
    const salt = bcryp.genSaltSync();
    usuario.password = bcryp.hashSync( password, salt );

    //Grabar el registro
    await usuario.save(); // si da fallo detendra la aplicacion
    res.json({
        usuario
    });
}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, ...resto } = req.body;

    // Validar contra la base de datos si existe 
    if ( password ) {
        const salt = bcryp.genSaltSync();
        resto.password = bcryp.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true});

    res.json({
        usuario
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async (req, res = response) => {

    // Borrado fisico del usuario, pero no se recomienda un borrado en la base de datos para
    // no perder la integridad referencial
    // const { id } = req.params;
    // const usuario = await Usuario.findByIdAndDelete(id);

    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
    const usuarioAutenticado = req.usuario;
    res.json({
        usuario,
        usuarioAutenticado
    });
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}