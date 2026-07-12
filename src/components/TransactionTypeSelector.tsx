import { TransactionType } from "../types/transactions";

interface TransactionTypeSelectionProps {
    value: TransactionType,
    id?: string,
    onChange: (type: TransactionType) => void
}

function TransactionTypeSelector({
    value, id, onChange
}: TransactionTypeSelectionProps) {

    const transactionsTypeButtons = [
        {
            type: TransactionType.EXPENSE,
            label: "Despesas",
            activeClasses: "bg-red-500 border-red-500 text-red-700 font-medium",
            inactiveClasses: "bg-transparent border-red-300 text-red-500 hover:bg-red-50",
        },
        {
            type: TransactionType.INCOME,
            label: "Receita",
            activeClasses: "bg-green-500 border-green-500 text-green-700 font-medium",
            inactiveClasses: "bg-transparent border-green-300 text-green-500 hover:bg-green-50",
        }
    ]

    return (
        <fieldset id={id} className="grid grid-cols-2 flex gap-4">
            {
                transactionsTypeButtons.map(i =>
                    <button key={i.type}
                        onClick={() => onChange(i.type)}
                        className={`flex items-center cursor-pointer justify-center border
                        ${value === i.type ? i.activeClasses : i.inactiveClasses}
                        rounded-md py-2 transition-all
                        `}
                        type="button">
                        {i.label}
                    </button>
                )
            }
        </fieldset >
    )
}

export default TransactionTypeSelector;