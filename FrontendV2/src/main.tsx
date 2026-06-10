import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import {RouterProvider}  from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools' // esto es para ver la herramientas
import { Router } from './Router'

const queryClient = new QueryClient()


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={Router}/>
    </QueryClientProvider>
  
  </StrictMode>,
)
