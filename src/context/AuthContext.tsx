/*
    O context é dividido em 3 blocos principais:
    createContext;
    Provider;
    Exportação;
*/

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react"
import type { AuthState } from "../types/auth";

import { firebaseAuth, googleAuthProvider } from '../config/firebase'
import { signInWithPopup, onAuthStateChanged, signOut as firebaseLogout } from "firebase/auth";

interface AuthContextProps {
    /*
        É a tipagem do objeto "options" que é as propriedades/funções que o nosso useAuth tem e vamos exportar
        para toda a aplicação (desde que, a sua chamada esteja sendo feita dentro do useAuth context)
     */
    authState: AuthState;
    signWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
}

//criando o context e já informando o tipo e o que ele deve receber/ser
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

//aqui é um component, estamos recebendo propriedades e definindo state
export const AuthProvider = ({ children }: { children: ReactNode }) => {

    //state que guardará os dados do usuário
    const [authState, setAuthState] = useState<AuthState>({

        //definindo mais o esqueleto do state
        user: null,
        error: null,
        loading: false,
    })

    //Chamada a firebase para logins
    const signWithGoogle = async (): Promise<void> => {
        setAuthState((prev) => ({ ...prev, loading: true }))

        try {
            await signInWithPopup(firebaseAuth, googleAuthProvider)
        } catch (err) {
            setAuthState((prev) => ({ ...prev, loading: false, error: err instanceof Error ? err.message : "Não foi possível entrar com o Google." }))
        }
    }
    const signOut = async (): Promise<void> => {
        setAuthState((prev) => ({ ...prev, loading: true }))

        try {
            await firebaseLogout(firebaseAuth)
            setAuthState({
                user: null,
                error: null,
                loading: false,
            })

        } catch (err) {
            setAuthState((prev) => ({ ...prev, loading: false, error: err instanceof Error ? err.message : "Não foi possível sair da conta." }))

        }
    }

    //autenticação
    useEffect(() => {
        //handle de auth do próprio firebase
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
            //capturando user:
            console.log(user)
            if (user) {
                //definindo o state
                setAuthState({
                    user: {
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    error: null,
                    loading: false
                })
            } else {
                setAuthState({
                    user: null,
                    error: null,
                    loading: false,
                })
            }
        },
            (error) => {
                console.log("Erro na autenticação")
                setAuthState({
                    user: null,
                    error: error.message,
                    loading: false,
                })
            }
        )
        return () => unsubscribe();
    }, [])

    return (
        /*
            Carregando o AuthContext e passando para o provedor os valores (variáveis e funções) que podem ser
            usadas pelo programador.
        */
        <AuthContext.Provider value={{ authState, signWithGoogle, signOut }} >
            {/* Carregando a nossa aplicação: */}
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextProps => {
    //exportando o useContext useAuth()
    //tornando o nosso AuthContext um context de fato
    const context = useContext(AuthContext)

    if (!context) {
        //verificando se o context foi criado dentro de um ambiente em que o AuthProvider foi "incluído corretamente"
        throw new Error('useAuth deve ser usado dentro de um AuthProvider.')
    }
    //return context caso ele tenha sido definido com sucesso e tiver sido criado no ambiente correto
    return context;
}
