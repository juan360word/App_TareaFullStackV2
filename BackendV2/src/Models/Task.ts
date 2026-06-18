import mongoose,{Schema,Document,Types} from "mongoose";

// Creacion de diccionario
const taskStatus = {
    PENDIENTE: 'pendiente',
    EN_ESPERA: 'enEspera',
    EN_PROGRESO: 'enProgreso',
    EN_REVISION: 'enRevision',
    COMPLETADA: 'completada'
} as const

export type TaskStatus = typeof taskStatus[keyof typeof taskStatus]

export type TaskType = Document & {
    name:string,
    description:string,
    proyectos:Types.ObjectId,
    estado:TaskStatus,
    cambioBy: {
        user: Types.ObjectId,
        status: TaskStatus
    }[]
}

export const TaskSchema : Schema = new Schema ({
    name:{
        type:String,
        required:true,
        trim: true,
    },
    description:{
        type:String,
        required:true,
        trim: true,
    },
    proyectos:{
        type: Types.ObjectId,
        ref:'Proyecto'
    },
    estado:{
        type:String,
        enum:Object.values(taskStatus),
        default: taskStatus.PENDIENTE
    },
    cambioBy:[
        {
            user:{
                type: Types.ObjectId,
                ref:'user',
                default:null
            },
            status:{
                type:String,
                enum:Object.values(taskStatus),
                default: taskStatus.PENDIENTE
            }
        }
    ]
       
    

},{timestamps:true})

const Task = mongoose.model<TaskType>('Tarea',TaskSchema)
export default Task

