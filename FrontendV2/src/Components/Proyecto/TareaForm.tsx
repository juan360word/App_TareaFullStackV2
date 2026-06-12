import type{ FieldErrors, UseFormRegister } from "react-hook-form"
import type { TareaData } from "@/types/type";
import Error from "../Error";

type TaskFormProps = {
    errors: FieldErrors<TareaData>
    register: UseFormRegister<TareaData>
}

export default function TaskForm({errors, register} : TaskFormProps) {
    return (
        <>
            <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-[#a7a9be] text-2xl"
                    htmlFor="name"
                >Nombre de la tarea</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Nombre de la tarea"
                    className="w-full text-white p-3  "
                    {...register("name", {
                        required: "El nombre de la tarea es obligatorio",
                    })}
                />
                {errors.name && (
                    <Error>{errors.name.message}</Error>
                )}
            </div>

            <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-[#a7a9be] text-2xl"
                    htmlFor="description"
                >Descripción de la tarea</label>
                <textarea
                    id="description"
                    placeholder="Descripción de la tarea"
                    className="w-full p-3 text-white"
                    {...register("description", {
                        required: "La descripción de la tarea es obligatoria"
                    })}
                />
                {errors.description && (
                    <Error>{errors.description.message}</Error>
                )}
            </div>
        </>
    )
}