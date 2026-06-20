import { Router } from "express";
import { body } from "express-validator";
import { entradaError } from "../Middleware/validacion";
import { MiddlewareAuth } from "../Middleware/Auth";
import { PerfilController } from "../Controllers/PerfilController";


const RouterPerfil = Router()


RouterPerfil.put('/perfil',
    MiddlewareAuth,
    body('name').notEmpty().withMessage('El nombre no puede ir vacio'),
    body('email').isEmail().withMessage('El Email No valido'),entradaError,
    PerfilController.ActualizarPerfil
)

RouterPerfil.post('/ActualizarPWS',
    MiddlewareAuth,
    body('PWS_current').notEmpty().withMessage('La contraseña actual no puede ir vacia'),
    body('pws').isLength({ min: 8 }).withMessage('La contraseña es muy corta, minimo 8'),
    body('pws_confirmacion').custom((value, { req }) => { if (value !== req.body.pws) { throw new Error('Las contraseñas no son iguales') } return true }),
    entradaError,PerfilController.ActualizarPWSbutNewPWS
)

export default RouterPerfil
