import {Schema,Document,Types} from 'mongoose'
import mongoose from 'mongoose'



export interface Nota extends Document {
    contenido:string,
    creadoby:Types.ObjectId,
    tarea:Types.ObjectId
}

const NotaSchema = new Schema ({
    contenido:{
        type:String,
        required:true
    },
    creadoby:{
        type:Types.ObjectId,
        ref:'User',
        required: true
    },
    tarea:{
        type:Types.ObjectId,
        ref:'Tarea',
        required: true
    }
},{timestamps:true})

const Notas = mongoose.model<Nota>('Nota',NotaSchema)
export default Notas


