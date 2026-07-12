import { useNavigate } from "react-router-dom";
import { GoogleLoginButton } from "../components/GoogleLoginButton";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
const Login = () => {
    const navigate = useNavigate();
    const { signWithGoogle, authState } = useAuth();

    useEffect(() => {
        if (authState.user && !authState.loading) navigate('/dashboard')
    }, [authState.user, authState.loading, navigate])

    const handleLogin = async () => {
        try {
            await signWithGoogle()

        } catch (error) {
            console.error("Erro ao fazer login com o google", error)
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <header>
                    <h1 className="text-center text-3xl font-extrabold text-gray-900">DevBills</h1>
                    <p className="mt-2 text-center text-sm text-gray-600">Gerencia suas finanças de forma simples e eficientes.</p>
                </header>
                <main className="mt-8 bg-white py-8 px-4 shadow-md rounded-lg sm:px-10 space-y-6">
                    <section className="mb-6">
                        <h2 className="text-lg font-medium text-gray-900">Faça Login para continuar</h2>
                        <p className="mt-1 text-sm text-gray-600">Acesse sua conta:</p>
                    </section>
                    <GoogleLoginButton isLoading={false} onClick={handleLogin} />
                    {authState.error && (
                        <div className="bg-red-50 text-center text-red-700 mt-4">
                            <p>{authState.error}</p>
                        </div>
                    )}

                    <footer className="mt-6">
                        <p className="mt-1 text-sm text-gray-600 text-center">Ao fazer login, você concorda com os nossos termos de uso e política de privacidade.</p>
                    </footer>
                </main>
            </div>
        </div>
    )
}

export default Login;