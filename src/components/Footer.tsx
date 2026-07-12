import { useEffect, useState } from "react";

const Footer = () => {
    const [currentYear, setCurrentYear] = useState<number | null>(null)

    useEffect(() => {
        async function loadCurrentYear(): Promise<void> {
            setCurrentYear(await new Date().getFullYear());
        } loadCurrentYear()
    }, [])
    return (
        <footer className="bg-gray-800 border-t fixed bottom-0 text-center mt-4 border-gray-700 py-4">
            <p className="text-sm text-gray-400 ">DevBills {currentYear} - Desenvolvido por <strong>Gabriel Costa</strong> com </p>
            <strong>TypeScript</strong> &
            <strong> React</strong> &
            <strong> Tailwind</strong>
        </footer>
    )
}
export default Footer;