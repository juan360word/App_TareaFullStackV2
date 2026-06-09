
import { Link } from "react-router-dom"

const Dashboard = () => {
  return (
    <>
    <h1 className="text-5xl font-black text-white">Mis Proyectos</h1>
    <p className="text-2xl font-light text-[#a7a9be] mt-5">Maneja y adminstra tus Proyectos</p>
    <nav className="my-5">
       <Link className="bg-[#1A191F] text-[#a7a9be] hover:bg-white hover:text-black  px-10 py-3 font-bold cursor-pointer transition-colors"
        to='/proyecto/creado'>
        Nuevo Proyecto
    </Link>  
    </nav>
   
    </>
  )
}

export default Dashboard