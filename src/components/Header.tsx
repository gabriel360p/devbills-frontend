import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { ActivityIcon, HamburgerIcon, LogIn, LogOut, LogOutIcon, Menu, X } from "lucide-react";
interface NavLink {
    name: string;
    path: string;
}
const Header = () => {
    const { authState, signOut } = useAuth();
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    // !! -> verifica a condição, se authState.user tiver valor, ele se torna um true ou false
    const isAuthenticate: boolean = !!authState.user;

    const navLink: NavLink[] = [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Transações", path: "/transacoes" },
    ]

    const renderAvatar = () => {
        if (!authState.user) return
        if (authState.user.displayName) {
            return (
                <img
                    src={`${authState.user.photoURL}`}
                    alt={`Avatar de ${authState.user.displayName}`}
                    className="w-9 h-9 rounded-full border border-primary-500"
                />
            )
        }

        return (<div
            className="w-8 h-8 rounded-full border border-primary-500"
        >
            {authState.user.displayName?.charAt(0)}
        </div>)
    }

    return (
        <header className="bg-gray-900 border-b border-gray-700">
            <div className="container-app">
                <div className="flex justify-between items-center py-4">
                    <Link to={'/dashboard'} className="flex gap-2 text-primary-600">
                        <ActivityIcon />
                        DevBills
                    </Link>

                    {/* MENU DESKTOP */}
                    <nav className="hidden md:flex space-x-3">
                        {navLink.map(link => (
                            <Link
                                className={` transition-all
                                ${pathname === link.path ? "text-primary-600 bg-primary-700/10 rounded p-1" :
                                        "text-gray-500 bg-gray-700 rounded p-1"}
                                `}
                                to={link.path} key={link.path} >{link.name}</Link>
                        ))}
                    </nav>

                    <div className="hidden md:flex space-x-3">
                        {isAuthenticate ? (
                            <div className="flex items-center justify-center gap-4">
                                {renderAvatar()}
                                <span className="font-bold">{authState.user?.displayName}</span>
                                <LogOutIcon className="cursor-pointer text-primary-600"
                                    onClick={() => { signOut() }}
                                />
                            </div>
                        ) : (
                            <div className="flex items-center justify-center gap-4">
                                {renderAvatar()}
                                <span className="font-semibold">Faça Login</span>
                                <LogIn className="cursor-pointer text-primary-600"
                                    onClick={() => navigate('/login')}
                                />
                            </div>
                        )}
                    </div>
                    {/* Botão MOBILE */}
                    <div className="flex md:hidden space-x-3">
                        <button type="button"
                            onClick={() => {
                                setIsOpenMenu(!isOpenMenu)
                            }}
                            className="text-gray-400 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            {isOpenMenu ? (<X size={24} />) : (<Menu size={24} />)}
                        </button>
                    </div>
                </div>
            </div>

            {isOpenMenu && (
                <div>
                    <div>
                        {isAuthenticate ? (
                            <div className={`
                                md:hidden
                                ${isOpenMenu ? 'flex' : 'hidden'}
                                flex-col
                            `}>
                                <nav className="space-y-1 flex flex-col">
                                    {navLink.map(link => (
                                        <Link
                                            onClick={() => setIsOpenMenu(false)}
                                            className={
                                                ` 
                                                py-2 px-2
                                                transition-all ${pathname === link.path ?
                                                    "text-primary-600 hover:bg-primary-700/10 rounded p-1" :
                                                    "text-gray-500 hover:bg-gray-700 rounded p-1"}
                                                 `
                                            }
                                            to={link.path} key={link.path} >{link.name}</Link>
                                    ))}
                                </nav>
                                <div className="flex items-center justify-between p-3 border-t border-gray-600">
                                    <div className="flex w-full items-center gap-4 justify-center space-x-2">
                                        {renderAvatar()}
                                        {authState.user?.displayName}
                                        <LogOutIcon className="cursor-pointer text-primary-600"
                                            onClick={() => { signOut() }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>oi</p>
                        )}
                    </div>
                </div>
            )}
        </header >
    )
}
export default Header;