
import { useForm } from "react-hook-form"
import Error from "../Error";
import type { ActualizarPWS } from "@/types/type";
import { useMutation } from "@tanstack/react-query";
import { ChasePws } from "@/services/PerfilAPI";
import { toast } from "react-toastify";


export default function ActualizarClavePerfil() {
  const initialValues : ActualizarPWS = {
    current_password: '',
    pws: '',
    pws_confirmacion: ''

  }

  const { register, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: initialValues })

  const {mutate} = useMutation({
    mutationFn:ChasePws,
    onError:(error) => {
      toast.error(error.message)
  },
  onSuccess:(data) => {
      toast.success(data)
      
  }
  })

  const password = watch('pws');

  const handleChangePassword = (formData : ActualizarPWS) => mutate(formData)

  return (
    <>
      <div className="mx-auto max-w-3xl">

        <h1 className="text-5xl font-black ">Cambiar Password</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">Utiliza este formulario para cambiar tu password</p>

        <form
          onSubmit={handleSubmit(handleChangePassword)}
          className=" mt-14 space-y-5 bg-white shadow-lg p-10 rounded-lg"
          noValidate
        >
          <div className="mb-5 space-y-3">
            <label
              className="text-sm uppercase font-bold"
              htmlFor="current_password"
            >Password Actual</label>
            <input
              id="current_password"
              type="password"
              placeholder="Password Actual"
              className="w-full p-3  border border-gray-200"
              {...register("current_password", {
                required: "El password actual es obligatorio",
              })}
            />
            {errors.current_password && (
              <Error>{errors.current_password.message}</Error>
            )}
          </div>

          <div className="mb-5 space-y-3">
            <label
              className="text-sm uppercase font-bold"
              htmlFor="password"
            >Nuevo Password</label>
            <input
              id="password"
              type="password"
              placeholder="Nuevo Password"
              className="w-full p-3  border border-gray-200"
              {...register("pws", {
                required: "El Nuevo Password es obligatorio",
                minLength: {
                  value: 8,
                  message: 'El Password debe ser mínimo de 8 caracteres'
                }
              })}
            />
            {errors.pws && (
              <Error>{errors.pws.message}</Error>
            )}
          </div>
          <div className="mb-5 space-y-3">
            <label
              htmlFor="password_confirmation"
              className="text-sm uppercase font-bold"
            >Repetir Password</label>

            <input
              id="password_confirmation"
              type="password"
              placeholder="Repetir Password"
              className="w-full p-3  border border-gray-200"
              {...register("pws_confirmacion", {
                required: "Este campo es obligatorio",
                validate: value => value === password || 'Los Passwords no son iguales'
              })}
            />
            {errors.pws_confirmacion && (
              <Error>{errors.pws_confirmacion.message}</Error>
            )}
          </div>

          <input
            type="submit"
            value='Cambiar Password'
            className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  )
}