import { createBrowserRouter } from "react-router-dom"
import AppLayout from "./Layout/AppLayout"
import Dashboard from "./pages/Dashboard"
import CreacionProyecto from "./pages/Proyecto/CreacionProyecto"
import EditarProyecto from "./pages/Proyecto/EditarProyecto"
import  DetallesProyecto  from "./pages/Proyecto/DetallesProyecto"
import AuthLayout from "./Layout/AuthLayout"
import Login from "./pages/Auth/Login"
import Registro from "./pages/Auth/Registro"
import ConfirmarcionCuenta from "./pages/Auth/ConfirmarcionCuenta"
import ReenvioCodigo from "./pages/Auth/ReenvioCodigo"

export const Router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout/>,
        children:[
            {
              index:true,  
              element: <Dashboard/>
            },
            {
                path:'/proyecto/creado',
                element: <CreacionProyecto/>
            },
            {
                path:'/proyecto/:proyectoid',
                element: <DetallesProyecto/>
            },
            {
                path:'/proyecto/:proyectoid/creado',
                element: <EditarProyecto/>
            }
        ]
    },
    {
        path:'/login',
        element:<AuthLayout/>,
        children:[
            {
                index:true,
                element:<Login/>

            }
    ]},
    {
        path: '/registro',  
        element: <AuthLayout/>,
        children: [
            { index: true, element: <Registro/> }
        ]
    },
    {
        path: '/confirmacion',  
        element: <AuthLayout/>,
        children: [
            { index: true, element: <ConfirmarcionCuenta/> }
        ]
    },
    {
        path: '/reenvioCode',  
        element: <AuthLayout/>,
        children: [
            { index: true, element: <ReenvioCodigo/> }
        ]
    }
])
