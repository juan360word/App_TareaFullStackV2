import type  {Request,Response} from 'express'
import Proyecto from '../../Models/Proyecto'
import { exit } from 'node:process';




export  class ProyectoController {

    static CreateProyectoPost = async (req:Request,res:Response) => {

        const proyecto = new Proyecto(req.body)

        try {
            await proyecto.save()
            res.send('Proyecto creado Correctamente')
        } catch (error) {
            console.log(error)
            exit(1)
        }
    }

    static getTodosProyectos = async (req:Request,res:Response) => {
        try {
            const proyectos = await Proyecto.find({})
            res.json(proyectos)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error al traer los proyectos' })
        }
    }

    static getLlamadoID= async (req:Request,res:Response) => {
            const {id} = req.params

            try {
                const proyecto = await Proyecto.findById(id).populate('Tasks')
                if (!proyecto) {
                    const error = new Error('Proyectos no encontrado')
                    return res.status(404).json({ error: error.message })
                }
                res.json(proyecto)
            } catch (error) {
                console.log(error)
                res.status(500).json({ error: 'Error Al traer los proyectos' })
            }
    }

    static UpdateProyecto= async (req:Request,res:Response) => {
            const {id} = req.params

            try {
               const proyecto = await Proyecto.findByIdAndUpdate(id, req.body, {
                returnDocument: 'after',
                runValidators: true,
               })
               
               if (!proyecto) {
                const error = new Error('Proyectos no encontrado')
                return res.status(404).json({ error: error.message })
               }

               res.send('Se a Actualizado El poryecto')
            } catch (error) {
                console.log(error)
                res.status(500).json({ error: 'Error al actualizar el proyecto' })
            }
    }
    static DeleteProyecto= async (req:Request,res:Response) => {

            const {id} = req.params

            try {
              const proyecto = await Proyecto.findByIdAndDelete(id)
              if(!proyecto){
                const error = new Error('Proyectos no encontrado')
                return res.status(404).json({error: error.message})
            }

              res.send('Proyecto Eliminado')
            } catch (error) {
                console.log(error)
                exit(1)
            }
       
    }
}