




export const AgregarNotas = () => {
  return (
    <>
    <form  className="space-y-3"
    onSubmit={() => {}}
    noValidate
    >
        <div className="flex flex-col gap-3">
            <label className=' text-white text-2xl' htmlFor="">Crear notas</label>
            <input
                id='contenido'
                type="text"
                placeholder="Aca va el contenido de la Nota"
                className="w-full p-3 border text-white rounded-2xl border-white"
            >
            
            </input>
        </div>
        <input type="submit" value='Crear Nota' className=" w-1/2 mx-auto rounded-2xl flex cursor-pointer transition-colors bg-white hover:bg-green-800 font-black hover:text-black hover p-2 " />
    </form>
    </>
  )
}
