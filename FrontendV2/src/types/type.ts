import * as v from 'valibot'

// USUARIO Y AUTENTICACION
const authSchema = v.object({
    name: v.string(),
    email: v.pipe(v.string(),v.email()),
    pws: v.string(),
    pws_confirmacion: v.string(),
    token: v.string()
})

export  type Auth = v.InferOutput<typeof authSchema>
export type UsuarioLogin = Pick<Auth, 'email' | 'pws' >
export type UsuarioRegister = Pick<Auth, 'name' | 'email' | 'pws' | 'pws_confirmacion' >
export type Reenviocodigo =Pick<Auth,  'email'  >
export type olvidoclave =Pick<Auth,  'email'  >
export type NewPasswordForm =Pick<Auth,  'pws' | 'pws_confirmacion'  >


export type confirmacionToken = Pick<Auth,'token'>







// parte de tareas
const taskStatusSchema = v.picklist(["pendiente", "enEspera", "enProgreso", "enRevision", "completada"])

export const  TareaSchema = v.object({
    _id: v.string(),
    name: v.string(),
    description: v.string(),
    proyectos:v.string(),
    estado:taskStatusSchema,
    createdAt:v.string(),
    updatedAt:v.string()
})

export type Task = v.InferOutput<typeof TareaSchema >
export type TareaData = Pick<Task,'name'|'description'>
export type TaskEstado = v.InferOutput<typeof taskStatusSchema  > // ESTE ES PARA LOS ESTADOS


export const  proyectoSchema = v.object({
    _id: v.string(),
    proyectoName: v.string(),
    clientename:v.string(),
    description:v.string(),
    Tasks: v.array(TareaSchema)
})

export const DasboProyectoSchema = v.array(
   v.pick(proyectoSchema,['_id', 'proyectoName', 'clientename', 'description'])
)

export type Proyecto = v.InferOutput<typeof proyectoSchema>

export type proyectoData =  Pick<Proyecto,'clientename'|'proyectoName'|'description'>

