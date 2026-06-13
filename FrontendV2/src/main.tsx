import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import {RouterProvider}  from 'react-router-dom'
import { Router } from './Router'
import ErrorBoundary from './Components/ErrorBoundary'

const queryClient = new QueryClient()


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={Router}/>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>,
)
