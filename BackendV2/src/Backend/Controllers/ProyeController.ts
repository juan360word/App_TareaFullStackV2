import type  {Request,Response} from 'express'
import Proyecto from '../../Models/Proyecto'
import User from '../../Models/User'





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
                if(proyecto.Admin.toString() !== req.user._id.toString()){
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

    static AddMember = async (req:Request,res:Response) => {
        const {id} = req.params
        const {userId} = req.body

        try {
            const proyecto = await Proyecto.findById(id)
            if (!proyecto) {
                const error = new Error('Proyecto no encontrado')
                return res.status(404).json({ error: error.message })
            }

            if (proyecto.Admin.toString() !== req.user!._id.toString()) {
                const error = new Error('Solo el admin puede agregar miembros')
                return res.status(403).json({ error: error.message })
            }

            const user = await User.findById(userId)
            if (!user) {
                const error = new Error('Usuario no encontrado')
                return res.status(404).json({ error: error.message })
            }

            if (proyecto.Members.some(m => m.toString() === userId)) {
                const error = new Error('El usuario ya es miembro del proyecto')
                return res.status(409).json({ error: error.message })
            }

            proyecto.Members.push(user._id)
            await proyecto.save()
            res.send('Miembro agregado correctamente')
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error al agregar miembro' })
        }
    }

    static RemoveMember = async (req:Request,res:Response) => {
        const {id,userId} = req.params

        try {
            const proyecto = await Proyecto.findById(id)
            if (!proyecto) {
                const error = new Error('Proyecto no encontrado')
                return res.status(404).json({ error: error.message })
            }

            if (proyecto.Admin.toString() !== req.user!._id.toString()) {
                const error = new Error('Solo el admin puede eliminar miembros')
                return res.status(403).json({ error: error.message })
            }

            proyecto.Members = proyecto.Members.filter(m => m.toString() !== userId)
            await proyecto.save()
            res.send('Miembro eliminado correctamente')
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error al eliminar miembro' })
        }
    }
}