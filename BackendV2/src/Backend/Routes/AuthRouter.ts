
import { Router } from "express";
import { body } from "express-validator";
import { AuthController } from "../Controllers/AuthController";
import { entradaError } from "../Middleware/validacion";



const RouterAuth = Router()

RouterAuth.post('/create-cuenta',
    body('name').notEmpty().withMessage('El nombre no puede ir vacio'),
    body('pws').isLength({min:8}).withMessage('La contraseña es muy corta, minimo 8'),
    body('pws_confirmacion').custom((value,{req}) => { if(value !== req.body.pws_confirmacion) {throw new Error('Las contraseñas no son iguales')} return true }),
    body('email').isEmail().withMessage('El Email No valido'),entradaError,
    AuthController.createAuth)

export default RouterAuth