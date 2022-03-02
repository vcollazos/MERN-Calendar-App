/*  aquí creo el CRUD
    Event Routes
    /api/evens
*/ 
const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento }  = require('../controllers/events');

const router = Router();

// validamos el JWT para todos los eventos
router.use( validarJWT );


// Obtener eventos: todas tienen que pasar por la validaciónde JWToken
router.get('/', getEventos);


// crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatorio').custom( isDate ),
        check('end', 'Fecha de finalización es obligatorio').custom( isDate ),
        validarCampos
    ],
     crearEvento
);


// Actualizar evento
router.put(
    '/:id', 
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    actualizarEvento 
);



// Borrar evento
router.delete('/:id', eliminarEvento);


module.exports = router;