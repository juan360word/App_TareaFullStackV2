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
// Usuario
export const userSchema = v.object({
    ...v.pick(authSchema, ['name','email']).entries,
    _id: v.string()
})
export type User = v.InferOutput<typeof userSchema>

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
    Tasks: v.array(TareaSchema),
    Admin: v.pick(userSchema, ['_id'])
})

export const DasboProyectoSchema = v.array(v.object({
    _id: v.string(),
    proyectoName: v.string(),
    clientename: v.string(),
    description: v.string(),
    Admin: v.string()
}))

export type Proyecto = v.InferOutput<typeof proyectoSchema>

export type proyectoData =  Pick<Proyecto,'clientename'|'proyectoName'|'description'>

//Equipo/Miembros

const EquipoSchema = v.pick(userSchema, ['name', 'email', '_id'])
export const EquipoArregloSchema = v.array(EquipoSchema)
export type EquipoArreglo = v.InferOutput<typeof EquipoArregloSchema>
export type EquipoMiembros = v.InferOutput<typeof EquipoSchema>
export type EquipoMiembrosForm = Pick<EquipoMiembros,'email'>


