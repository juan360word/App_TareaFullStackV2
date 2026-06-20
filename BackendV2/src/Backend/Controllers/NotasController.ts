import type {Request,Response} from 'express'
import Notas ,{Nota} from '../../Models/Nota'
import { Types } from 'mongoose'

type NotaParams = {
    notasId: Types.ObjectId
}





export class NotaController{
    static createNota = async (req:Request<{},{},Nota>,res:Response) => {
        try {
            const {contenido} = req.body
            const note = new Notas()
            note.contenido = contenido
            note.creadoby = req.user._id
            note.tarea = req.task._id

            if (!req.task.notas) req.task.notas = []
            req.task.notas.push(note._id)

            await Promise.all([req.task.save(),note.save()])
            res.status(201).json({msg: 'La nota fue creada correctamente'})
        } catch (error) {
            console.log('Error al crear nota:', error)
            res.status(500).json({ error: error instanceof Error ? error.message : 'No se pudo crear la Nota' })
        }
    }

    static GetNota = async (req:Request,res:Response) => {
        try {
            const note = await Notas.find({tarea: req.task._id})
            res.json(note)
        } catch (error) {
            console.log('Error al obtener notas:', error)
            res.status(500).json({ error: error instanceof Error ? error.message : 'No se pudo traer la Nota' })
        }
    }
    static EliminarNota = async (req:Request<NotaParams>,res:Response) => {
        try {
           const {notasId} = req.params
           const nota = await Notas.findById(notasId)
           if(!nota){
            const error = new Error('No se encuentra la Nota')
            return res.status(404).json({error: error.message})
           }

           if(nota.creadoby.toString() !== req.user._id.toString()){
            const error = new Error('Que haces, no puedes eliminarla')
            return res.status(401).json({error: error.message})
           }
           req.task.notas = req.task.notas.filter(notas => notas.toString() !== notasId.toString())

           await Promise.all([req.task.save(),nota.deleteOne()])
           res.send('Nota eliminada')

        } catch (error) {
            console.log('Error al eliminar nota:', error)
            res.status(500).json({ error: error instanceof Error ? error.message : 'No se permitio eliminar la Nota' })
        }
    }
}
