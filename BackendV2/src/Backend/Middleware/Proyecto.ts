import {Request,Response,NextFunction} from 'express'
import { validationResult } from 'express-validator'
import Proyecto, { ProyectoType } from '../../Models/Proyecto'


declare global {
    namespace Express {
        interface Request {
            proyecto: ProyectoType
        }
    }
}


export async function ValidacionProyectosExistan(req:Request,res:Response,next:NextFunction) {
    try {

        const {proyectoid} = req.params
        const proyecto = await Proyecto.findById(proyectoid)

        if(!proyecto){
            const error = new Error('Proyectos no encontrado')
            return res.status(404).json({error: error.message})
        }
        req.proyecto = proyecto
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Hubo un Error'})
    }
}