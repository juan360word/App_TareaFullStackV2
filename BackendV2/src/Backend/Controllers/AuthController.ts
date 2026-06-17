import { Request,Response } from "express"
import User from "../../Models/User"
import bcrypt from "bcrypt"
import Token from "../../Models/Tokens"
import { GenaradorTokens } from "../../utils/Tokens"
import { AuthCorreo } from "../../Correos/AuthCorreo"
import { JWT } from "../../utils/JWT"

export class AuthController {
    
    static createAuth = async (req:Request,res:Response) => {
        const {email,pws} = req.body
        try {
            // Se crea el usuario
            const users = new User(req.body)

            // El primer usuario registrado será admin
            const totalUsers = await User.countDocuments()
            if(totalUsers === 0){
                users.role = 'admin'
            }

            const salt = await bcrypt.genSalt(10)
            // Hash de la contraseña
            users.pws = await bcrypt.hash(users.pws, salt)

            // confirmacion de registro de usuario y correo
            const ExisteUsuario = await User.findOne({email})
            if(ExisteUsuario){
                const error = new Error('Ya esta Registrado este correo ')
                return res.status(409).json({error:'ERROR ESTE CORREO YA SE USO '})
            }

            // GENERAR TOKEN
            const token = new Token()
            token.token = GenaradorTokens()
            token.user = users._id

            // Correo
            await AuthCorreo.EnvioConfiguracionEmail({
               email:users.email ,
               name:users.email,
               token: token.token
            })

            await Promise.all([users.save(),token.save()])
            res.send('Perfecto 😉, Ve y revisa tu correo para validar ')
        } catch (error) {
           console.log(error)
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

           await Promise.all([
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

            await AuthCorreo.EnvioConfiguracionEmail({
                email:user.email ,
                name:user.email,
                token: token.token
            })
                await token.save()


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

            const token = JWT({id: user._id.toString()})
            res.json({token})


        } catch (error) {
            console.log(error) 
            res.status(500).json({error:"Tienes un error"})
        }

    }

    static envioDEconfirmacion = async (req:Request,res:Response) => {
        const {email} = req.body
        try {
            const user = await User.findOne({email})
            if(!user){
                const error = new Error('No esta Registrado el usuario')
                return res.status(404).json({error: error.message})
            }

            if(user.confirmed){
                const error = new Error('El usuario ya esta confirmado')
                return res.status(403).json({error: error.message})
            }

            const token = new Token()
            token.token = GenaradorTokens()
            token.user = user._id

            await AuthCorreo.EnvioConfiguracionEmail({
               email: user.email,
               name: user.email,
               token: token.token
            })

            await token.save()
            res.send('Perfecto 😉, Se envio un nuevo Token ')
        } catch (error) {
           console.log(error)
           res.status(500).json({error:"Tienes un error"})
        }
    }
    static olvidoContrasena = async (req:Request,res:Response) => {
        const {email} = req.body
        try {
            const user = await User.findOne({email})
            if(!user){
                const error = new Error('No esta Registrado el usuario')
                return res.status(404).json({error: error.message})
            }

            
            const token = new Token()
            token.token = GenaradorTokens()
            token.user = user._id
            await AuthCorreo.reiniciarcontrasena({
               email: user.email,
               name: user.email,
               token: token.token
            })
            await token.save()

            res.send('Perfecto 😉, Revisa tu Correo ')
        } catch (error) {
           console.log(error)
           res.status(500).json({error:"Tienes un error"})
        }
    }
    static ValidarToken = async (req:Request,res:Response) => {
        const {token} = req.body
        try {
            const tokenExistente = await Token.findOne({token})
            if(!tokenExistente){
                const error = new Error('Token no valido')
                return res.status(404).json({error: error.message})
            }
            res.send('Token valido')
        } catch (error) {
           console.log(error)
           res.status(500).json({error:"Tienes un error"})
        }
    }
    static UpdatePWS = async (req:Request,res:Response) => {
        const {token} = req.params
        const {pws,pws_confirmacion} = req.body
        try {
            const tokenExistente = await Token.findOne({token})
            if(!tokenExistente){
                const error = new Error('Token no valido')
                return res.status(404).json({error: error.message})
            }
            const user = await User.findById(tokenExistente.user)
            if(!user){
                await tokenExistente.deleteOne()
                const error = new Error('Usuario no encontrado')
                return res.status(404).json({error: error.message})
            }
            user.pws = await bcrypt.hash(pws, 10)
            await Promise.all([user.save(),tokenExistente.deleteOne()])
            res.send('SE ACTUALIZO LA CONTRASEÑA CORRECTAMENTE')
        } catch (error) {
           console.log(error)
           res.status(500).json({error:"Tienes un error"})
        }
    }
    static user = async (req:Request,res:Response) => {
       return res.json(req.user)
    }

    static promoteToAdmin = async (req:Request,res:Response) => {
        try {
            const firstUser = await User.findOne().sort({createdAt: 1})
            if(!firstUser || firstUser._id.toString() !== req.user!._id.toString()){
                return res.status(403).json({error:'No puedes realizar esta accion'})
            }
            firstUser.role = 'admin'
            await firstUser.save()
            res.send('Ahora eres administrador')
        } catch (error) {
            console.log(error)
            res.status(500).json({error:'Error al promover a admin'})
        }
    }

}