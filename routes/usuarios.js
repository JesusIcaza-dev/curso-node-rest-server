
const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');
const { esRolValido, existeCorreo, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos,
        validarJWT,
        tieneRole,
        esAdminRole  } = require('../middlewares');
const router = Router();


router.get('/', usuariosGet );

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
],usuariosPut );

router.post('/', [
    check('nombre', 'El nombre es obligaotorio').not().isEmpty(), // middleware de validacion de express-validator
    check('password', 'La contraseña debe de ser de mas de 6 caracteres').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(existeCorreo),
    check('rol').custom( esRolValido ),
    validarCampos
],usuariosPost );

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE', 'USER_ROLE'),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
],usuariosDelete );

router.patch('/', usuariosPatch );





module.exports = router;