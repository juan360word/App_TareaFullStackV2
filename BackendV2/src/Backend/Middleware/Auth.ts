import { Request,Response,NextFunction } from "express"
import  jwt  from "jsonwebtoken"
import User, { TypeUser } from "../../Models/User"

declare global {
    namespace Express {
        interface Request {
            user?: TypeUser
        }
    }
}

export const MiddlewareAuth = async (req:Request, res:Response,next:NextFunction) => {
    const beader = req.headers.authorization
    if(!beader){
        const error = new Error('No estas Autorizado')
        return res.status(401).json({error: error.message})
    }
    const [,token] = beader.split(' ')

    try {

        const variable_sin_nombre = jwt.verify(token,process.env.LLAVE_PRIVADAJWT)
        if(typeof variable_sin_nombre === 'object' && variable_sin_nombre.id){
            const user = await User.findById(variable_sin_nombre.id).select('_id name email')
            next()
            if(user){
                req.user = user
                return next()
            }
        }
        res.status(401).json({error:"Token no valido"})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}