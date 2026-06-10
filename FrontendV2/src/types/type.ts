import * as v from 'valibot'

// parte de tareas
const taskStatusSchema = v.picklist(["pendiente", "enEspera", "enProgreso", "enRevision", "completada"])

export const  TareaSchema = v.object({
    _id: v.string(),
    name: v.string(),
    description: v.string(),
    proyectos:v.string(),
    estado:taskStatusSchema
    
})

export type Task = v.InferOutput<typeof TareaSchema >
export type TareaData = Pick<Task,'name'|'description'>


export const  proyectoSchema = v.object({
    _id: v.string(),
    proyectoName: v.string(),
    clientename:v.string(),
    description:v.string()
    
})

export const DasboProyectoSchema = v.array(
   v.pick(proyectoSchema,['_id', 'proyectoName', 'clientename', 'description'])
)

export type Proyecto = v.InferOutput<typeof proyectoSchema>

export type proyectoData =  Pick<Proyecto,'clientename'|'proyectoName'|'description'>

