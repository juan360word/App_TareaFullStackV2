import { createBrowserRouter } from "react-router-dom"
import AppLayout from "./Layout/AppLayout"
import Dashboard from "./pages/Dashboard"
import CreacionProyecto from "./pages/Proyecto/CreacionProyecto"

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
            }
        ]
    }
])
