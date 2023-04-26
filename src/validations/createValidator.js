const {check} = require('express-validator');

module.exports = [
    check("title")
    .notEmpty().withMessage("El título es obligatorio").bail()
    .isLength({
        min : 2
    }).withMessage("Mínimo 2 letras").bail()
    .isAlpha("es-ES").withMessage("Solo caracteres alfabéticos"),
    
    check('rating')
    .notEmpty().withMessage('Debes indicar un rating').bail()
    .isInt({min:1, max: 10}).withMessage('Solo números positivos'),

    check('awards')
    .notEmpty().withMessage('Debes indicar un award').bail()
    .isInt({min:0}).withMessage('Solo números positivos'),

    check('length')
    .notEmpty().withMessage('Debes indicar un length').bail()
    .isInt({min:1}).withMessage('Solo números positivos'),

    check("genre_id")
    .notEmpty().withMessage("El género es obligatorio").bail()
]