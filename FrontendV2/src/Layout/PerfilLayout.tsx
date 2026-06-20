import PerfilHeader from "@/Components/Perfil/PerfilHeader/Header"
import { Outlet } from "react-router-dom"


const PerfilLayout = () => {
  return (
    <>
    <PerfilHeader/>
     <Outlet/>
    </>
   
  )
}

export default PerfilLayout