import { Request,Response } from "express"
import User from "../../Models/User"
import bcrypt from "bcrypt"
import Token from "../../Models/Tokens"
import { GenaradorTokens } from "../../utils/Tokens"
import { AuthCorreo } from "../../Correos/AuthCorreo"


export class AuthController {
    
    static createAuth = async (req:Request,res:Response) => {
        const {email,pws} = req.body
        try {
            // Se crea el usuario
            const users = new User(req.body)
            const salt = await bcrypt.genSalt(10)
            // Hash de la contraseña
            users.pws = await bcrypt.hash(users.pws, salt)

            // confirmacion de registro de usuario y correo
            const ExisteUsuario = await User.findOne({email})
            if(ExisteUsuario){
                const error = new Error('Ya esta Registrado este correo ')
                return res.status(409).json({error:'ERROR ESTE CORREO YA SE USO '})
            }
            // Validacion de de contraseña (otra)
            const esValido = await bcrypt.compare(pws,users.pws)
            if(!esValido) {
                return res.status(404).json({error:'Contraseña incorrecta '})
            }
            
            // GENERAR TOKEN
            const token = new Token()
            token.token = GenaradorTokens()
            token.user = users._id

            // Correo
            AuthCorreo.EnvioConfiguracionEmail({
               email:users.email ,
               name:users.email,
               token: token.token
            })

            await users.save()
            await Promise.allSettled([users.save(),token.save()])
            res.send('Se envio al correo Correctamente')
        } catch (error) {
           res.status(500).json({error:"Tienes un error"})
        }
    }
}