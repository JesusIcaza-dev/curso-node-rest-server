const { validationResult } = require('express-validator');


const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    next(); // En caso de que llegue aqui que prosiga con el siguiente middleware y en caso de que no haya entonces el controlador
}

module.exports = {
    validarCampos
}