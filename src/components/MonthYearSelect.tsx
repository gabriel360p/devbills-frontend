//tipando as props do component
interface MonthYearSelecProps {
    month: number;
    year: number;
    onMonthChange: (month: number) => void;
    onYearChange: (month: number) => void;
}
import { ChevronLeft, ChevronRight } from "lucide-react"

const MonthYearSelect = ({
    month, year, onMonthChange, onYearChange
}: MonthYearSelecProps
) => {

    const monthNames: readonly string[] = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
    ];

    const currentYear = new Date().getFullYear();
    const years: number[] = Array.from({ length: 11 }, (_, i): number => {
        return currentYear - 5 + i
    })

    const handlePrevMonth = (): void => {
        if (month === 12) {
            onMonthChange(1)
            onYearChange(year + 1)
        } else {
            onMonthChange(month + 1)
        }
    }
    const handleNextMonth = (): void => {
        if (month === 1) {
            onMonthChange(12)
            onYearChange(year - 1)
        } else {
            onMonthChange(month - 1)
        }
    }

    return (
        <div className="flex items-center justify-end gap-1 bg-gray-900 rounded-lg border-gray-700 p-3">

            <button onClick={handlePrevMonth} aria-label="Mês anterior" type="button" className="cursor-pointer p-2 rounded-full hover:bg-gray-800 hover:text-primary-500 transition-colors">
                <ChevronLeft />
            </button>
            <div className="flex gap-4">
                <label htmlFor="month-select" className="sr-only">Selecionar Mês</label>
                <select onChange={(event) => onMonthChange(Number(event.target.value))} value={month} className="bg-gray-800 cursor-pointer border-gray-700 rounded-md px-3 py-2 text-sm font-medium text-gray-100 focus: outline-none focus:ring-1" name="" id="month-select">
                    {monthNames.map((month, index) => (
                        <option value={index + 1} key={month}>{month}</option>
                    ))}
                </select>

                <label htmlFor="year-select" className="sr-only">Selecionar Ano</label>
                <select onChange={(event) => onYearChange(Number(event.target.value))} value={year} className="bg-gray-800 cursor-pointer border-gray-700 rounded-md px-3 py-2 text-sm font-medium text-gray-100 focus: outline-none focus:ring-1" name="" id="year-select">
                    {years.map((year, index) => (
                        <option value={year} key={year}>{year}</option>
                    ))}
                </select>
            </div>
            <button aria-label="Próximo Mês" onClick={handleNextMonth} type="button" className="p-2  cursor-pointer rounded-full hover:bg-gray-800 hover:text-primary-500 transition-colors">
                <ChevronRight />
            </button>
        </div>
    )
}
export default MonthYearSelect;