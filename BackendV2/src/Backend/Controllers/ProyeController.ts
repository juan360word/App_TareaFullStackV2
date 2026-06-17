import type  {Request,Response} from 'express'
import Proyecto from '../../Models/Proyecto'






export  class ProyectoController {

    static CreateProyectoPost = async (req:Request,res:Response) => {
        if (!req.user) {
            return res.status(401).json({ error: 'No autorizado' })
        }

        const proyecto = new Proyecto(req.body)

        proyecto.Admin = req.user._id

        try {
            await proyecto.save()
            res.send('Proyecto creado Correctamente')
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error al crear el proyecto' })
        }
    }

    static getTodosProyectos = async (req:Request,res:Response) => {
        if (!req.user) {
            return res.status(401).json({ error: 'No autorizado' })
        }
        try {
            const proyectos = await Proyecto.find({
                $or: [
                    { Admin: req.user._id },
                    { Members: req.user._id }
                ]
            })
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
                const isAdmin = proyecto.Admin.toString() === req.user._id.toString()
                const isMember = proyecto.Members.some(m => m.toString() === req.user._id.toString())
                if(!isAdmin && !isMember){
                    const error = new Error('no valido')
                    return res.status(404).json({error:error.message})
                }
                res.json(proyecto)
            } catch (error) {
                console.log(error)
                res.status(500).json({ error: 'Accion no valida' })
            }
    }

    static UpdateProyecto= async (req:Request,res:Response) => {
            const {id} = req.params

            try {
               const proyecto = await Proyecto.findByIdAndUpdate(id, req.body, {
                new:true,
                runValidators: true,
               })
               
               if (!proyecto) {
                const error = new Error('Proyectos no encontrado')
                return res.status(404).json({ error: error.message })
               }
               if(proyecto.Admin.toString() !== req.user._id.toString()){
                const error = new Error('Solo el admin toca esto')
                return res.status(404).json({error:error.message})
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
            if(proyecto.Admin.toString() !== req.user._id.toString()){
                const error = new Error('Solo el admin puede eliminarlo')
                return res.status(404).json({error:error.message})
            }

              res.send('Proyecto Eliminado')
            } catch (error) {
                console.log(error)
                res.status(500).json({ error: 'Error al eliminar el proyecto' })
            }
        
    }

   
}