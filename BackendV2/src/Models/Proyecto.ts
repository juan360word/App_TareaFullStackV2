import mongoose,{Schema,Document,PopulatedDoc,ObjectId,Types} from "mongoose";
import  Task,{TaskType} from "./Task";
import { TypeUser } from "./User";


export type ProyectoType = Document & {
    proyectoName:string,
    clientename:string,
    description:string,
    Tasks: PopulatedDoc<TaskType & Document>[]
    Admin: PopulatedDoc<TypeUser & Document>
    Members: PopulatedDoc<TypeUser & Document>[]
}
// esto de aca abajo es de mongoDB lo de arriba es de typeScript
const ProyectoSchema : Schema = new Schema ({
    proyectoName: {
        type:String,
        required:true,
        trim: true, // corta los espacios que se crea 
    },
    clientename:{
        type:String,
        required:true,
        trim: true,
    },
    description:{
        type:String,
        required:true,
        trim: true,
    },
    Tasks:[{
        type: Types.ObjectId,
        ref:'Tarea'
       
    }
    ],Admin:{
        type: Types.ObjectId,
        ref:'user'
    },
    Members:[{
        type: Types.ObjectId,
        ref:'user'
    }]
},{timestamps:true})


const Proyecto = mongoose.model<ProyectoType>('Proyecto',ProyectoSchema)
export default Proyecto

