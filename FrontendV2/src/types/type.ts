import * as v from 'valibot'


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

