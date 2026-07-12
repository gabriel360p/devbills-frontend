
/* 
    Não precisa tipar a function do component, pq é redundante, pois o typescript já infere sozinho
*/

import type { JSX } from "react/jsx-runtime";
import Button from "../components/Button";
import { Wallet, TrendingUp, List, CreditCard } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

//tipando objeto feature
interface Feature {
    icon: JSX.Element;
    title: string;
    desccription: string;

}

function Home() {
    const navigate = useNavigate();

    //array list 
    const features: ReadonlyArray<Feature> = [
        {
            icon: <Wallet className="w-8 h-8 text-primary-700" />,
            title: "Controle Financeiro",
            desccription:
                "Monitore suas despesas e receitas em um só lugar, com uma interface intuitiva e fácil de usar.",
        },
        {
            icon: <TrendingUp className="w-8 h-8 text-primary-700" />,
            title: "Relatórios",
            desccription:
                "Visualize graficamente seus gastos e entenda para onde seu dinheiro está indo.",
        },
        {
            icon: <List className="w-8 h-8 text-primary-700" />,
            title: "Categorias Personalizadas",
            desccription: "Organize suas transações em categorias para melhor análise.",
        },
        {
            icon: <CreditCard className="w-8 h-8 text-primary-700" />,
            title: "Transações Ilimitadas",
            desccription:
                "Adicione quantas transações quiser e mantenha um histórico completo de suas finanças.",
        },
    ];

    return (
        <div className="bg-gray-950 min-h-screen">
            <div className="container-app">

                <section className="py-12 md:py-20">
                    <div className="items-center grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h1 className="font-bold text-white mb-6 text-4xl md:text-5xl">Gerencie suas finanças com o <span className="text-primary-500">DevBills</span></h1>
                            <p className="text-lg text-white mb-8">
                                Uma plataforma simples e eficiente para controlar suas despesas e receitas.
                                Organize suas finanças pessoais ou do seu negócio com facilidade.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0">
                            <Button className="text-center px-6 py-3" onClick={() => navigate('/login')}>Começar Agora</Button>
                        </div>
                    </div>
                </section>
                <section className="py-12 md:py-20 bg-gray-900 rounded-xl">
                    <div className="container-app">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-white mb-4">Recursos do DevBills</h2>
                            <p className="text-lg text-white max-w-2xl mx-auto">Nossa plataforma oferece tudo o que você precisa para manter suas finanças organizadas</p>
                        </div>

                        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

                            {features.map(feature => (
                                <div key={feature.title} className="bg-gray-800 p-6 rounder-xl hover:shadow-lg">
                                    <div className="mb-4 p-3 bg-primary-500/10 rounded-full inline-block">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                                    <p className="text-gray-400">{feature.desccription}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="py-12 md:py-20">
                    <div className="bg-gray-900 p-8 rounded-xl text-center md:p-12 border border-gray-700">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Pronto para organizar suas finanças?</h2>
                        <p className="text-white text-opacity-90 mx-auto mb-8">
                            Comece a usar o DevBills e tenha total controle sobre seu dinheiro. É gratuito e fácil de usar!
                        </p>
                        <Button className="mx-auto px-6 py-3" onClick={() => navigate('/login')}>Criar Conta Gratuita</Button>
                    </div>
                </section>
            </div>
        </div>

    )
}

export default Home;