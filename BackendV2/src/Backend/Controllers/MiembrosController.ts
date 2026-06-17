import Proyecto from "../../Models/Proyecto"
import type  {Request,Response} from 'express'
import User from '../../Models/User'

export class Miembros {
    static FindMember = async (req:Request,res:Response) => {
        const {email} = req.body
        try {
            const user = await User.findOne({email}).select('_id name email')
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' })
            }
            res.json(user)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error al buscar usuario' })
        }
    }

    static AddMember = async (req:Request,res:Response) => {
        const {id} = req.params
        const {id: userId} = req.body

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

            if (proyecto.Members.some(m => m.toString() === userId)) {
                const error = new Error('El usuario ya es miembro del proyecto')
                return res.status(409).json({ error: error.message })
            }

            proyecto.Members.push(userId)
            await proyecto.save()
            res.send('Miembro agregado correctamente')
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error al agregar miembro' })
        }
    }

    static Get = async (req:Request,res:Response) => {
        const {id} = req.params
        const proyecto = await Proyecto.findById(id).populate({
            path:'Members',
            select: '_id email name'
        })
        if(!proyecto){
            return res.status(404).json({error:'Proyecto no encontrado'})
        }
        res.json(proyecto.Members)
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