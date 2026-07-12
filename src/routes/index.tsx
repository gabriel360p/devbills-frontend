import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../containers/Home'
import NotFound from '../layout/notfound';
import Login from '../containers/Login';
import { AuthProvider } from '../context/AuthContext';
import Dashboard from '../containers/Dashboard';
import PrivateRoutes from './PrivateRoutes';
import AppLayout from '../layout/AppLayout';
import TransactionsForm from '../containers/TransactionsForm';
import Transactions from '../containers/Transactions';
import { ToastContainer, type ToastContainerProps } from 'react-toastify';

const AppRoutes = () => {
    const toastConfig: ToastContainerProps = {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        newestOnTop: true,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: false,
        theme: 'dark',
    }

    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='*' element={<NotFound />} />

                    <Route element={<PrivateRoutes />}>

                        <Route element={<AppLayout />}>
                            <Route path='/dashboard' element={<Dashboard />} />
                            <Route path='/transacoes' element={<Transactions />} />
                            <Route path='/transacoes/nova' element={<TransactionsForm />} />
                        </Route>

                    </Route>

                </Routes>
                <ToastContainer {...toastConfig} />
            </AuthProvider>
        </BrowserRouter>
    )
}

export default AppRoutes;