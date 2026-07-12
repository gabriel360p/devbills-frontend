import { ChevronDown } from "lucide-react";
import { useId, type ReactNode, type SelectHTMLAttributes } from "react";

interface SelectOptions {
    value: string;
    label: string;
}

interface selectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    icon?: ReactNode;
    fullWidth?: boolean;
    options: SelectOptions[];
}

function Select({
    label,
    error,
    icon,
    fullWidth,
    options,
    ...rest
}: selectProps) {
    const selectId = useId()


    return (
        <div className={`relative
        ${fullWidth ? "w-full" : ""
            }
        mb-4
        `}>
            <label className="block text-sm font-medium text-gray-50" htmlFor={selectId}>
                {label}
            </label>

            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-2 top-5 flex items-center text-gray-700">{icon} </div>
                )}
            </div>

            <select {...rest} id={selectId} className="w-full py-3 border border-gray-700 text-gray-50 text-sm pl-10 pr-4 rounded-xl">
                {options?.map(option => (
                    <option className="bg-gray-800" value={option.value} key={option.value}>{option.label}</option>
                ))}
            </select>
            {error && (
                <p
                    className="mt-1 text-sm text-red"
                >{error}</p>
            )}
        </div>
    )
}
export default Select;