import { Request,Response,NextFunction } from "express"

export const checkRole = (...roles: string[]) => {
    return (req:Request, res:Response, next:NextFunction) => {
        if(!req.user){
            return res.status(401).json({error:'No estas Autorizado'})
        }
        if(!roles.includes(req.user.role)){
            return res.status(403).json({error:'No tienes permisos para realizar esta accion'})
        }
        next()
    }
}
