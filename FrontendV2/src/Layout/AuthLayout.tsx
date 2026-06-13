import Logo from '@/Components/Logo'
import { Link, Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Zoom } from 'react-toastify'

const AuthLayout = () => {
  return (
    <>
    
    <div className='min-h-screen'>
        <div className='py-10 lg:py-20 mx-auto w-[450px]'>
            <Link to='/'>
            <Logo/>
            </Link> 
            <div className='mt-10'>
                <Outlet/>
            </div>
        </div>
    </div>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Zoom}
    />





    
    </>
  )
}

export default AuthLayout
