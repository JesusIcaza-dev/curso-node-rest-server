const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {
    const query = req.query
    res.send({
        msg: 'get API - controlador',
        query
    });
}

const usuariosPost = (req, res = response) => {
    const persona = req.body; // recibe la informacion de la request en el formato que venga
    res.json({
        msg: 'post API - controlador',
        persona
    });
}

const usuariosPut = (req, res = response) => {
    const id = req.params.id; // esto hay que definirlo en la ruta apropiada como /:nombreParam
    res.send({
        msg: 'put API - controlador',
        id
    });
}

const usuariosPatch = (req, res = response) => {
    res.send({ msg: 'patch API - controlador'});
}

const usuariosDelete = (req, res = response) => {
    res.send({ msg: 'delete API - controlador'});
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}