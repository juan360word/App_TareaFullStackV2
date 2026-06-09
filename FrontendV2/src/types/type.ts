import * as v from 'valibot'


export const  proyectoSchema = v.object({
    _id: v.string(),
    proyectoName: v.string(),
    clientename:v.string(),
    description:v.string()
    
})

export type Proyecto = v.InferOutput<typeof proyectoSchema>

export type proyectoData =  Pick<Proyecto,'clientename'|'proyectoName'|'description'>

