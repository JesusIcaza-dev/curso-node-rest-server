
// llamar a la utilidad de router de express para poder crear nuestras rutas
const { Router } = require('express');

// llamar a los controladores para poner la funcionalidad de cada una de nuestras rutas creadas
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/user');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', usuariosPost);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;