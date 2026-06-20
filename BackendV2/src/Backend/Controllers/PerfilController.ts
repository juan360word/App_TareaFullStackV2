import { Request,Response } from "express"
import bcrypt from "bcrypt"
import User from "../../Models/User"


export class PerfilController {
    static  ActualizarPerfil = async (req:Request,res:Response) => {
        try {
            const {name,email} = req.body
            const userExiste = await User.findOne({email})
            if(userExiste && userExiste._id.toString() !== req.user._id.toString()){
                const error = new Error('Correo ya esta registrado')
                return res.status(409).json({error:error.message})
            }

            req.user.name = name
            req.user.email = email

            await req.user.save()
            res.send('Perfil Actualizado')

        } catch (error) {
            res.status(500).send('Se tiene un Error')
        }
    }
    static  ActualizarPWSbutNewPWS = async (req:Request,res:Response) => {
        try {
            const {PWS_current,pws} = req.body

            const user = await User.findById(req.user._id)
            if(!user){
                const error = new Error('Usuario no encontrado')
                return res.status(404).json({error:error.message})
            }

            const pwsCorrecta = await bcrypt.compare(PWS_current, user.pws)
            if(!pwsCorrecta){
                const error = new Error('La contraseña actual esta mal')
                return res.status(409).json({error:error.message})
            }
            
            user.pws = await bcrypt.hash(pws, 10)
            await user.save()
            res.send('La contraseña cambio correctamente')

        } catch (error) {
            res.status(500).send('Se tiene un Error')
        }


    }
}