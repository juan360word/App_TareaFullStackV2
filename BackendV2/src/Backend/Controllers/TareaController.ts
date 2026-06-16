import type  {Request,Response} from 'express'
import Task from '../../Models/Task';


export class TareaController {

    static CreateTask = async (req:Request,res:Response) => {
        try {
            const tarea = new Task(req.body)
            tarea.proyectos = req.proyecto._id
            req.proyecto.Tasks.push(tarea._id)
            await Promise.all([tarea.save(),req.proyecto.save()])
            res.send('Se envio la Tarea correctamente')
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error al crear la tarea' })
        }
    }

    static GetTask = async (req:Request,res:Response) => {
        
        
        try {
            const Tasks = await Task.find({proyectos: req.proyecto._id}).populate('proyectos') // esto nos ayuda a cruzar la informacion populate
            res.json(Tasks)
        } catch (error) {
            console.log(error)
            res.status(400).json({ error: 'Error Al traer las tareas' })
        }
    }

    static GetTaskID = async (req:Request,res:Response) => {
        try {
            res.json(req.task)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error Al traer las tareas' })
        }
    }

    static UpdateTarea = async (req:Request,res:Response) => {
        try {
            req.task.name = req.body.name
            req.task.description = req.body.description
            await req.task.save()
            res.send('Tarea Actualizada')
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error Al actualizar la tarea' })
        }
    }
    static DeleteTarea = async (req:Request,res:Response) => {
        try {
            const {id} = req.params
            req.proyecto.Tasks = req.proyecto.Tasks.filter(item => item.toString() !== id.toString())
            await Promise.all([req.task.deleteOne(), req.proyecto.save()])
            res.send('Tarea Eliminada')
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error Al eliminar la tarea' })
        }
    }

    static UpdateEstados = async (req:Request,res:Response) => {
      try {
        req.task.estado = req.body.estado
        await req.task.save()
        res.send('Estado Actualizado')
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error Al actualizar el estado' })
      }
    }



}






