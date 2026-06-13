
import { Router } from "express";
import { body } from "express-validator";
import { AuthController } from "../Controllers/AuthController";
import { entradaError } from "../Middleware/validacion";



const RouterAuth = Router()

RouterAuth.post('/create-cuenta',
    body('name').notEmpty().withMessage('El nombre no puede ir vacio'),
    body('pws').isLength({ min: 8 }).withMessage('La contraseña es muy corta, minimo 8'),
    body('pws_confirmacion').custom((value, { req }) => { if (value !== req.body.pws) { throw new Error('Las contraseñas no son iguales') } return true }),
    body('email').isEmail().withMessage('El Email No valido'), entradaError,
    AuthController.createAuth)

RouterAuth.post('/confirmacion-cuenta',
    body('token').notEmpty().withMessage('El token no puede ir vacio'), entradaError,
    AuthController.Confirmacion
)

RouterAuth.post('/login', body('email').isEmail().withMessage('El Email No valido'),
    body('pws').notEmpty().isLength({ min: 8 }).withMessage('La contraseña es muy corta, minimo 8'),
    body('pws_confirmacion').custom((value, { req }) => { if (value !== req.body.pws) { throw new Error('Las contraseñas no son iguales') } return true }),
    entradaError, AuthController.Login)



export default RouterAuth