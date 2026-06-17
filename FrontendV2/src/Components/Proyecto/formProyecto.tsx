
import Error from "../Error"
import type {UseFormRegister,FieldErrors} from 'react-hook-form'
import type { proyectoData } from "../../types/type"
type ProjectFormTypes = {
    register: UseFormRegister<proyectoData>,    
    errors: FieldErrors<proyectoData>    
}

export default function ProjectForm({errors,register}:ProjectFormTypes) {
    return (
        <>
            <div className="mb-5 space-y-3">
                <label htmlFor="proyectoName" className="text-sm  text-text-muted uppercase font-bold">
                    Nombre del Proyecto
                </label>
                <input
                    id="proyectoName"
                    className="w-full p-3 text-black "
                    type="text"
                    placeholder="Nombre del Proyecto"
                    {...register("proyectoName", {
                        required: "El Titulo del Proyecto es obligatorio",
                    })}
                />

                {errors.proyectoName && (
                    <Error>{errors.proyectoName.message}</Error>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="clientename" className="text-sm text-text-muted uppercase font-bold">
                    Nombre Cliente
                </label>
                <input
                    id="clientename"
                    className="w-full p-3   text-black"
                    type="text"
                    placeholder="Nombre del Cliente"
                    {...register("clientename", {
                        required: "El Nombre del Cliente es obligatorio",
                    })}
                />

                {errors.clientename && (
                    <Error>{errors.clientename.message}</Error>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="description" className="text-sm text-text-muted uppercase font-bold">
                    Descripción
                </label>
                <textarea
                    id="description"
                    className="w-full p-3   text-black"
                    placeholder="Descripción del Proyecto"
                    {...register("description", {
                        required: "Una descripción del proyecto es obligatoria"
                    })}
                />

                {errors.description && (
                    <Error>{errors.description.message}</Error>
                )}
            </div>
        </>
    )
}