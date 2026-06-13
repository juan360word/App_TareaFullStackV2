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
            res.send('Perfecto 😉, Ve y revisa tu correo para validar ')
        } catch (error) {
           res.status(500).json({error:"Tienes un error"})
        }
    }

    static Confirmacion = async (req:Request,res:Response) => {
        try {
            const {token} = req.body

           const tokenExistente = await Token.findOne({token})
           if(!tokenExistente){
            const error = new Error('Token no valido')
            return res.status(404).json({error:error.message})
           }

           const user = await User.findById(tokenExistente.user)
           user.confirmed = true

           await Promise.allSettled([
            user.save(),
            tokenExistente.deleteOne()
           ])

           res.send('Se envio correctamente la verificacion')

        } catch (error) {
            console.log(error) 
            res.status(500).json({error:"Tienes un error"})
        }
    }

    static Login = async( req:Request,res:Response) => {

        try {

            const {email,pws} = req.body
            const user = await User.findOne({email})
            // ESTO MIRA SI UN USUARIO EXISTE
             if(!user) {
                const error = new Error('Usuario no Encontrado..')
            return res.status(404).json({error:error.message})
             }
             if(!user.confirmed){
                const token = new Token()
                token.user = user._id
                token.token = GenaradorTokens()
                await token.save()

            AuthCorreo.EnvioConfiguracionEmail({
                email:user.email ,
                name:user.email,
                token: token.token
            })


                const error = new Error('Usuario no Esta Confirmado,Vuelve a revisar')
                return res.status(401).json({error:error.message})
             }


            const MostrarCo = async (contraIngresada: string, ContraOculta:string) => {
                return await bcrypt.compare(contraIngresada,ContraOculta)
            } 

            const ContrasenaCorrecta = await MostrarCo(pws,user.pws)
            if(!ContrasenaCorrecta){
                const error = new Error('Contraseña incorrecta')
            return res.status(404).json({error:error.message})
            }

            res.send('Upa acabaste de ingresar la contraseña correcta 😮‍💨')


        } catch (error) {
            console.log(error) 
            res.status(500).json({error:"Tienes un error"})
        }

    }


}