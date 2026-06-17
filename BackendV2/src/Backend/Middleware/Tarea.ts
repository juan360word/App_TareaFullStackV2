import {Request,Response,NextFunction} from 'express'
import Task, { TaskType } from '../../Models/Task'


declare global {
    namespace Express {
        interface Request {
            task: TaskType
        }
    }
}


export async function ValidacionTareasExistan(req:Request,res:Response,next:NextFunction) {
    try {

        const {id} = req.params
        const task = await Task.findById(id)

        if(!task){
            const error = new Error('Tarea no encontrado')
            return res.status(404).json({error: error.message})
        }
        req.task = task
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Hubo un Error'})
    }
}

export async function QuienEliminaTareas(req:Request,res:Response,next:NextFunction) {
    try {
        if(req.task.proyectos.toString() !== req.proyecto._id.toString()){
            const error = new Error('Esa no es la tarea del poryecto')
            return res.status(400).json({error: error.message})
        }
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Hubo un Error'})
    }
}
export async function Autorizacion(req:Request,res:Response,next:NextFunction) {
    if(req.user._id.toString() !== req.proyecto.Admin.toString()){
        const error = new Error('NO')
        return res.status(400).json({error: error.message})
    }
    
    next()
}